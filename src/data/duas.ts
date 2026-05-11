export interface DuaBlock {
  id: number
  arabic: string
  transliteration: string
  ru: string
  en: string
  tt: string
  source: string
}

export const DUAS: DuaBlock[] = [
  {
    id: 1,
    arabic: 'أَلَمْ تَرَوْا أَنَّ اللَّهَ سَخَّرَ لَكُم مَّا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ وَأَسْبَغَ عَلَيْكُمْ نِعَمَهُ ظَاهِرَةً وَبَاطِنَةً',
    transliteration: 'Alam taraw anna Llāha sakhkhara lakum mā fi s-samāwāti wa-mā fi l-arḍ wa-asbagha ʿalaykum niʿamahū ẓāhiratan wa-bāṭinah',
    ru: 'Разве вы не видите, что Аллах подчинил вам то, что на небесах, и то, что на земле, и щедро одарил вас Своими явными и скрытыми благами?',
    en: 'Do you not see that Allah has subjected to you whatever is in the heavens and whatever is on the earth, and has lavished upon you His favors, both apparent and hidden?',
    tt: 'Аллаhның күкләрдәге һәм жирдәгене барысын да сезгә буйсындырганын, күренгән-күренмәгән нигъмәтләрен биргәнен күрмисезме?',
    source: '31:20',
  },
  {
    id: 2,
    arabic: 'قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ ۚ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا ۚ إِنَّهُ هُوَ الْغَفُورُ الرَّحِيمُ',
    transliteration: 'Qul yā ʿibādiya lladhīna asrafū ʿalā anfusihim lā taqnaṭū min raḥmati Llāh, inna Llāha yaghfiru dh-dhunūba jamīʿan, innahu huwa l-Ghafūru r-Raḥīm',
    ru: 'Скажи: «О Мои рабы, которые допустили излишества против самих себя! Не отчаивайтесь в милости Аллаха. Воистину, Аллах прощает все грехи, ибо Он — Прощающий, Милосердный»',
    en: 'Say: O My servants who have transgressed against themselves, do not despair of the mercy of Allah. Indeed, Allah forgives all sins. Indeed, He is the Forgiving, the Merciful.',
    tt: 'Әйт: «Ий, үзенә зарар китергән бәндәләрем! Аллаhның рәхмәтеннән өметегезне өзмәгез. Чыннан да, Аллаh барлык гөнаhларны гафу итә. Ул — Гафур, Рахим»',
    source: '39:53',
  },
  {
    id: 3,
    arabic: 'وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ ۖ فَلْيَسْتَجِيبُوا لِي وَلْيُؤْمِنُوا بِي لَعَلَّهُمْ يَرْشُدُونَ',
    transliteration: "Wa-idhā saʾalaka ʿibādī ʿannī fa-innī qarīb, ujību daʿwata d-dāʿi idhā daʿān, fa-l-yastajiībū lī wa-l-yuʾminū bī laʿallahum yarshudūn",
    ru: 'Когда Мои рабы спрашивают тебя обо Мне, то ведь Я близок и отвечаю на зов молящегося, когда он взывает ко Мне. Пусть же они отвечают Мне и веруют в Меня, — быть может, они последуют верным путём',
    en: 'And when My servants ask you concerning Me — indeed I am near. I respond to the invocation of the supplicant when he calls upon Me. So let them respond to Me and believe in Me that they may be guided.',
    tt: 'Бәндәләрем Минем хакымда сорасалар — Мин якын. Миңа дога кылучының теләген Мин кабул итәм. Шуңа алар Миңа итагать итсеннәр, Миңа ышансыннар — бәлки туры юлга керерләр',
    source: '2:186',
  },
  {
    id: 4,
    arabic: 'رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ',
    transliteration: 'Rabbanā ẓalamnā anfusanā wa-in lam taghfir lanā wa-tarḥamnā la-nakūnanna mina l-khāsirīn',
    ru: 'Господь наш! Мы поступили несправедливо по отношению к себе, и если Ты не простишь нас и не смилостивишься над нами, то мы окажемся в числе потерпевших убыток',
    en: 'Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers.',
    tt: 'Рабыбыз! Без үзебезгә зарар иттек. Эгәр Син безне гафу итмәсәң һәм рәхим кылмасаң, без зыян күрүчеләр арасында булырбыз',
    source: '7:23',
  },
  {
    id: 5,
    arabic: 'رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً ۚ إِنَّكَ أَنتَ الْوَهَّابُ',
    transliteration: "Rabbanā lā tuzigh qulūbanā baʿda idh hadaytanā wa-hab lanā min ladunka raḥmah, innaka anta l-Wahhāb",
    ru: 'Господь наш! Не дай нашим сердцам уклониться в сторону после того, как Ты наставил нас на прямой путь, и даруй нам милость от Себя, ведь Ты — Дарующий',
    en: 'Our Lord, let not our hearts deviate after You have guided us and grant us from Yourself mercy. Indeed, You are the Bestower.',
    tt: 'Рабыбыз! Туры юлга тотынгач, йөрәкләребезне кайтарма. Үзеңнән безгә рәхмәт бир. Чыннан да, Син — Вәhхабсың',
    source: '3:8',
  },
  {
    id: 6,
    arabic: 'اللَّهُمَّ إِنَّكَ عَفُوٌّ كَرِيمٌ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي',
    transliteration: "Allāhumma innaka ʿafuwwun karīmun tuḥibbu l-ʿafwa faʿfu ʿannī",
    ru: 'О Аллах, поистине Ты — Прощающий, Великодушный, любишь прощение, поэтому прости меня',
    en: 'O Allah, indeed You are Pardoning, Generous, You love pardon, so pardon me.',
    tt: 'Аллаhым, Чыннан да Син — Гафу Кылучысың, Кәримсең, гафуны яратасың, шуңа мине гафу ит',
    source: 'Хадис (Тирмизи)',
  },
  {
    id: 7,
    arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ سُبْحَانَ اللَّهِ الْعَظِيمِ',
    transliteration: 'Subḥāna Llāhi wa-biḥamdihī, subḥāna Llāhi l-ʿAẓīm',
    ru: 'Пречист Аллах и хвала Ему, Пречист Аллах Великий',
    en: 'Glory be to Allah and praise be to Him, Glory be to Allah the Almighty.',
    tt: 'Аллаhны мактыйм, Олуг Аллаhны дан итәм',
    source: 'Хадис (Бухари)',
  },
]
