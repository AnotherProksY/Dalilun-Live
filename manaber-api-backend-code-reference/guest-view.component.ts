import { Component, DestroyRef, OnDestroy, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { GPTAgentDomain } from '../../modules/modules/gpt-agent.const';
import { Agent, PullResponse } from '../../modules/modules/core/services/gpt-agent.interfaces';
import { QueueItem } from './guest-view.interfaces';

@Component({
  selector: 'app-guest-view',
  imports: [],
  templateUrl: './guest-view.component.html',
  styleUrl: './guest-view.component.scss'
})
export class GuestViewComponent implements OnDestroy, OnInit {
  readonly #httpClient: HttpClient = inject(HttpClient);
  readonly #destroyRef: DestroyRef = inject(DestroyRef);

  text: WritableSignal<string> = signal<string>('');
  elapsed: WritableSignal<number | null> = signal<number | null>(null);

  audioText: WritableSignal<string> = signal<string>('');
  audioElapsed: WritableSignal<number | null> = signal<number | null>(null);

  audioUnlocked: WritableSignal<boolean> = signal<boolean>(false);
  selectedAgentId: WritableSignal<Agent | null> = signal<Agent | null>('en');

  readonly agentOptions: { label: string; value: Agent }[] = [
    { label: 'Английский', value: 'en' },
    { label: 'Урду', value: 'ur' },
    { label: 'Индонезийский', value: 'id' },
    { label: 'Турецкий', value: 'tr' },
    { label: 'Русский', value: 'ru' },
    { label: 'Татарский', value: 'tt' },
  ];

  #intervalId: ReturnType<typeof setInterval> | null = null;
  #lastAudioId: string = '';
  #queue: QueueItem[] = [];
  #isPlaying: boolean = false;

  ngOnInit(): void {
    this.#intervalId = setInterval(() => this.#pull(), 100);
    // const agentId = this.selectedAgentId();
    // if (agentId) this.#syncAgent(agentId);
  }

  ngOnDestroy(): void {
    if (this.#intervalId) {
      clearInterval(this.#intervalId);
    }
  }

  selectAgent(agent: Agent): void {
    this.selectedAgentId.set(agent);
    // this.#syncAgent(agent);
  }

  // #syncAgent(agent: Agent): void {
  //   this.#httpClient
  //     .get<PullResponse>(`${GPTAgentDomain}/pull`, { params: { agentId: agent } })
  //     .pipe(takeUntilDestroyed(this.#destroyRef))
  //     .subscribe({
  //       next: (res) => {
  //         this.text.set(res.text);
  //         this.elapsed.set(res.elapsed);
  //         if (res.audioId) {
  //           this.#lastAudioId = res.audioId;
  //         }
  //       },
  //       error: (err) => console.error(err),
  //     });
  // }

  #pull(): void {
    const agentId = this.selectedAgentId();
    if (!agentId) {
      return;
    }
    this.#httpClient.get<PullResponse>(`${GPTAgentDomain}/pull`, { params: { agentId } }).pipe(takeUntilDestroyed(this.#destroyRef)).subscribe({
      next: (res) => {
        this.text.set(res.text);
        this.elapsed.set(res.elapsed);

        if (!res.audio.audioId || !this.audioUnlocked()) {
          return;
        }
        if (res.audio.audioId !== this.#lastAudioId) {
          this.#lastAudioId = res.audio.audioId;

          this.#queue.push({ text: res.audio.text, elapsed: res.audio.elapsed, audio: res.audio.audioBuffer });
          this.#playNext();
        }
      },
      error: (err) => console.error(err),
    });
  }

  #playNext(): void {
    if (this.#isPlaying || this.#queue.length === 0) {
      return;
    }

    const item = this.#queue.shift()!;
    this.audioText.set(item.text);
    this.audioElapsed.set(item.elapsed);

    if (!this.audioUnlocked() || !item.audio) {
      this.#playNext();
      return;
    }

    this.#isPlaying = true;
    const blob = this.#base64ToBlob(item.audio);
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.onended = () => {
      URL.revokeObjectURL(url);
      this.#isPlaying = false;
      this.#playNext();
    };
    audio.onerror = () => {
      URL.revokeObjectURL(url);
      this.#isPlaying = false;
      this.#playNext();
    };
    audio.play();
  }

  #base64ToBlob(base64: string): Blob {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new Blob([bytes], { type: 'audio/mpeg' });
  }

  unlockAudio(): void {
    this.audioUnlocked.set(true);
    this.#playNext();
  }
}
