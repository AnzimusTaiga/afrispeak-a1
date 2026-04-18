// ============================================================
// AfriSpeak A1 - Seed Script (French Context)
// 10 complete lessons with French translations
// Run: bun run prisma/seed.ts
// ============================================================

import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

interface LessonData {
  title: string
  description: string
  topic: string
  icon: string
  color: string
  order: number
  xpReward: number
  vocabulary: { word: string; translation: string; pronunciation: string; example: string }[]
  sentences: { english: string; context: string }[]
  exercises: { type: string; question: string; options: string[]; correctAnswer: string; hint: string; audioText: string }[]
}

const LESSONS: LessonData[] = [
  // ============================================================
  // LESSON 1: Greetings & Introductions
  // ============================================================
  {
    title: "Greetings & Introductions",
    description: "Apprenez à dire bonjour, à vous présenter et à demander comment va quelqu'un.",
    topic: "Everyday Basics",
    icon: "👋",
    color: "#58CC02",
    order: 1,
    xpReward: 50,
    vocabulary: [
      { word: "Hello", translation: "Bonjour", pronunciation: "heh-LOH", example: "Hello, my friend!" },
      { word: "Good morning", translation: "Bonjour", pronunciation: "good MOR-ning", example: "Good morning, Amina!" },
      { word: "Good evening", translation: "Bonsoir", pronunciation: "good EVE-ning", example: "Good evening, Kofi." },
      { word: "My name is", translation: "Je m'appelle", pronunciation: "my naym iz", example: "My name is Amina." },
      { word: "Nice to meet you", translation: "Enchanté(e)", pronunciation: "nys tuh meet yoo", example: "Nice to meet you, teacher." },
      { word: "How are you?", translation: "Comment allez-vous ?", pronunciation: "how ar yoo", example: "How are you, Fatima?" },
      { word: "I am fine", translation: "Je vais bien", pronunciation: "eye am fyn", example: "I am fine, thank you." },
      { word: "Goodbye", translation: "Au revoir", pronunciation: "good-BYE", example: "Goodbye, see you tomorrow!" },
    ],
    sentences: [
      { english: "Hello! My name is Amina.", context: "Utilisez cette phrase lorsque vous rencontrez quelqu'un pour la première fois." },
      { english: "Good morning, Kofi. How are you?", context: "Une salutation amicale du matin adressée à un ami ou un voisin." },
      { english: "I am fine, thank you. And you?", context: "Une réponse polie quand quelqu'un vous demande comment vous allez." },
      { english: "Nice to meet you, Mrs. Okafor.", context: "Montrez du respect lors de la rencontre d'une personne âgée ou d'un enseignant." },
      { english: "Goodbye, Amina! See you tomorrow.", context: "Dites ceci en quittant vos amis ou l'école." },
    ],
    exercises: [
      // 1-3: Easy (vocabulary recognition)
      {
        type: "tap_to_select",
        question: "Appuyez sur la salutation que vous utilisez le matin :",
        options: ["Good evening", "Good morning", "Goodbye", "Nice to meet you"],
        correctAnswer: "Good morning",
        hint: "Le matin, c'est quand le soleil se lève.",
        audioText: "Tap the greeting you use in the morning.",
      },
      {
        type: "tap_to_select",
        question: "Appuyez sur le mot qui signifie le contraire de bonjour :",
        options: ["My name is", "How are you?", "Goodbye", "Good morning"],
        correctAnswer: "Goodbye",
        hint: "Vous dites cela quand vous partez.",
        audioText: "Tap the word that means the opposite of hello.",
      },
      {
        type: "multiple_choice",
        question: "Que dites-vous quand vous rencontrez quelqu'un pour la première fois ?",
        options: ["Goodbye!", "My name is Kofi.", "How much?", "I am hungry."],
        correctAnswer: "My name is Kofi.",
        hint: "Pensez à vous présenter.",
        audioText: "What do you say when you meet someone for the first time?",
      },
      // 4-6: Medium (sentence completion & context)
      {
        type: "multiple_choice",
        question: "Amina dit « How are you? ». Quelle est une bonne réponse ?",
        options: ["My name is Amina.", "Goodbye!", "I am fine, thank you.", "Nice to meet you."],
        correctAnswer: "I am fine, thank you.",
        hint: "Cette phrase répond à la question sur la façon dont vous vous sentez.",
        audioText: "Amina says, how are you? What is a good response?",
      },
      {
        type: "tap_to_select",
        question: "Appuyez sur la salutation que vous utilisez quand le soleil se couche :",
        options: ["Good morning", "Hello", "Good evening", "Goodbye"],
        correctAnswer: "Good evening",
        hint: "Cette salutation est pour la fin de la journée.",
        audioText: "Tap the greeting you use when the sun goes down.",
      },
      {
        type: "listen_repeat",
        question: "Écoutez et répétez la salutation :",
        options: ["Hello! My name is Amina.", "Goodbye, see you tomorrow.", "I am hungry.", "How much is this?"],
        correctAnswer: "Hello! My name is Amina.",
        hint: "C'est ainsi que vous vous présentez.",
        audioText: "Hello! My name is Amina.",
      },
      // 7-10: Harder (grammar basics, contextual understanding, listening comprehension)
      {
        type: "multiple_choice",
        question: "Mme Okafor rencontre un nouvel élève nommé Kwame. Que devrait-elle dire ?",
        options: ["Goodbye, Kwame.", "Nice to meet you, Kwame.", "I am hungry, Kwame.", "Good morning, how much?"],
        correctAnswer: "Nice to meet you, Kwame.",
        hint: "Vous dites cela quand vous rencontrez quelqu'un de nouveau.",
        audioText: "Mrs. Okafor meets a new student named Kwame. What should she say?",
      },
      {
        type: "multiple_choice",
        question: "Zuri marche vers l'école le matin. Elle voit son amie Fatima. Que dit Zuri en premier ?",
        options: ["Good evening!", "Goodbye!", "Good morning!", "I am fine!"],
        correctAnswer: "Good morning!",
        hint: "C'est le matin, alors elle utilise la salutation du matin.",
        audioText: "Zuri walks to school in the morning. She sees her friend Fatima. What does Zuri say first?",
      },
      {
        type: "listen_repeat",
        question: "Écoutez et choisissez la bonne phrase :",
        options: ["I want to buy rice.", "Good morning, Kofi. How are you?", "The bus is here.", "Nice to meet you, Mrs. Okafor."],
        correctAnswer: "Good morning, Kofi. How are you?",
        hint: "Cette phrase contient une salutation et demande comment va quelqu'un.",
        audioText: "Good morning, Kofi. How are you?",
      },
      {
        type: "listen_repeat",
        question: "Écoutez et choisissez la bonne phrase :",
        options: ["I am fine, thank you. And you?", "My father drives a taxi.", "Today is Monday.", "I need a pen."],
        correctAnswer: "I am fine, thank you. And you?",
        hint: "C'est une réponse polie quand quelqu'un vous demande comment vous allez.",
        audioText: "I am fine, thank you. And you?",
      },
    ],
  },

  // ============================================================
  // LESSON 2: At the Market
  // ============================================================
  {
    title: "At the Market",
    description: "Apprenez des mots utiles pour acheter et vendre au marché local.",
    topic: "Shopping",
    icon: "🛒",
    color: "#FF9600",
    order: 2,
    xpReward: 50,
    vocabulary: [
      { word: "Market", translation: "Marché", pronunciation: "MAR-ket", example: "I go to the market every Saturday." },
      { word: "Buy", translation: "Acheter", pronunciation: "by", example: "I want to buy tomatoes." },
      { word: "Sell", translation: "Vendre", pronunciation: "sel", example: "The woman sells fresh fish." },
      { word: "Price", translation: "Prix", pronunciation: "prys", example: "What is the price of this rice?" },
      { word: "How much?", translation: "Combien ?", pronunciation: "how much", example: "How much is one kilo?" },
      { word: "Money", translation: "Argent", pronunciation: "MUN-ee", example: "I do not have enough money." },
      { word: "Fresh", translation: "Frais / Fraîche", pronunciation: "fresh", example: "These oranges are very fresh." },
      { word: "Expensive", translation: "Cher / Chère", pronunciation: "eks-PEN-siv", example: "This fabric is too expensive." },
    ],
    sentences: [
      { english: "Good morning! I want to buy fresh tomatoes.", context: "Utilisez cette phrase pour faire des courses de légumes au marché." },
      { english: "How much is one kilo of rice?", context: "Demandez le prix des produits alimentaires avant d'acheter." },
      { english: "That is too expensive. Can you give me a better price?", context: "Le marchandage est courant dans les marchés africains." },
      { english: "The woman at the market sells beautiful fabrics.", context: "Décrivez ce que les gens vendent au marché." },
      { english: "I need money to buy food for my family.", context: "Parlez de vos besoins d'achat." },
    ],
    exercises: [
      // 1-3: Easy (vocabulary recognition)
      {
        type: "tap_to_select",
        question: "Appuyez sur le mot qui signifie « coûte beaucoup d'argent » :",
        options: ["Fresh", "Buy", "Expensive", "Market"],
        correctAnswer: "Expensive",
        hint: "Ce mot décrit un prix élevé.",
        audioText: "Tap the word that means costing a lot of money.",
      },
      {
        type: "tap_to_select",
        question: "Appuyez sur l'endroit où Amina va acheter des tomates :",
        options: ["School", "Hospital", "Market", "Church"],
        correctAnswer: "Market",
        hint: "C'est un endroit où les gens achètent et vendent des choses.",
        audioText: "Tap the place where Amina goes to buy tomatoes.",
      },
      {
        type: "multiple_choice",
        question: "Amina est au marché. Elle veut connaître le prix. Que demande-t-elle ?",
        options: ["I am fine.", "How much is this?", "My name is Amina.", "Nice to meet you."],
        correctAnswer: "How much is this?",
        hint: "Elle veut connaître le coût.",
        audioText: "Amina is at the market. She wants to know the price. What does she ask?",
      },
      // 4-6: Medium (sentence completion & context)
      {
        type: "multiple_choice",
        question: "Kwame veut acheter des mangues. Le vendeur dit qu'elles coûtent 5 cedis pièce. Kwame n'a que 2 cedis. Que dit Kwame ?",
        options: ["I will buy ten.", "That is too expensive for me.", "I want to sell mangoes.", "Good morning."],
        correctAnswer: "That is too expensive for me.",
        hint: "Il n'a pas assez d'argent.",
        audioText: "Kwame wants to buy mangoes. The seller says they are 5 cedis each. Kwame has only 2 cedis. What does Kwame say?",
      },
      {
        type: "tap_to_select",
        question: "Appuyez sur le mot qui signifie « récemment cueilli, pas vieux » :",
        options: ["Expensive", "Sell", "Money", "Fresh"],
        correctAnswer: "Fresh",
        hint: "Vous voulez que vos fruits et légumes soient ainsi.",
        audioText: "Tap the word that means newly picked, not old.",
      },
      {
        type: "listen_repeat",
        question: "Écoutez et choisissez la bonne phrase :",
        options: ["I want to sell my house.", "I want to buy fresh tomatoes.", "How are you today?", "Goodbye, see you later."],
        correctAnswer: "I want to buy fresh tomatoes.",
        hint: "C'est quelque chose que vous dites au marché.",
        audioText: "I want to buy fresh tomatoes.",
      },
      // 7-10: Harder (grammar basics, contextual understanding, listening comprehension)
      {
        type: "multiple_choice",
        question: "Fatima vend des tissus au marché. Un client demande « How much is this fabric? ». Quel mot concerne le coût ?",
        options: ["Buy", "Fresh", "Price", "Sell"],
        correctAnswer: "Price",
        hint: "Ce mot vous dit combien quelque chose coûte.",
        audioText: "Fatima sells fabrics at the market. A customer asks, how much is this fabric? Which word is about the cost?",
      },
      {
        type: "multiple_choice",
        question: "Emeka dit : « I do not have enough money to buy the chicken. ». De quoi a-t-il besoin ?",
        options: ["More food", "More money", "A doctor", "A teacher"],
        correctAnswer: "More money",
        hint: "Il a besoin de plus de ce que vous utilisez pour payer.",
        audioText: "Emeka says, I do not have enough money to buy the chicken. What does he need?",
      },
      {
        type: "listen_repeat",
        question: "Écoutez et choisissez la bonne phrase :",
        options: ["The woman sells fresh fish.", "My father is a teacher.", "I go to school on Monday.", "The bus is at the station."],
        correctAnswer: "The woman sells fresh fish.",
        hint: "Cette phrase décrit ce que quelqu'un fait au marché.",
        audioText: "The woman sells fresh fish.",
      },
      {
        type: "listen_repeat",
        question: "Écoutez et choisissez la bonne phrase :",
        options: ["That is too expensive. Can you give me a better price?", "I have a headache.", "Today is Saturday.", "Please open your book."],
        correctAnswer: "That is too expensive. Can you give me a better price?",
        hint: "Cette phrase parle de marchandage au marché.",
        audioText: "That is too expensive. Can you give me a better price?",
      },
    ],
  },

  // ============================================================
  // LESSON 3: Family Members
  // ============================================================
  {
    title: "Family Members",
    description: "Apprenez les noms des membres de la famille et comment parler de votre famille.",
    topic: "Family",
    icon: "👨‍👩‍👧‍👦",
    color: "#CE82FF",
    order: 3,
    xpReward: 50,
    vocabulary: [
      { word: "Mother", translation: "Mère", pronunciation: "MUH-ther", example: "My mother cooks delicious food." },
      { word: "Father", translation: "Père", pronunciation: "FAH-ther", example: "My father drives a taxi." },
      { word: "Sister", translation: "Sœur", pronunciation: "SIS-ter", example: "My sister goes to school." },
      { word: "Brother", translation: "Frère", pronunciation: "BRUH-ther", example: "My brother plays football." },
      { word: "Baby", translation: "Bébé", pronunciation: "BAY-bee", example: "The baby is sleeping." },
      { word: "Grandmother", translation: "Grand-mère", pronunciation: "GRAND-muh-ther", example: "My grandmother tells good stories." },
      { word: "Family", translation: "Famille", pronunciation: "FAM-uh-lee", example: "I love my family very much." },
      { word: "Uncle", translation: "Oncle", pronunciation: "UNG-kul", example: "My uncle lives in Accra." },
    ],
    sentences: [
      { english: "This is my mother. She is a teacher.", context: "Présentez un membre de votre famille et son métier." },
      { english: "My father works at the hospital.", context: "Décrivez où travaille un parent." },
      { english: "I have two brothers and one sister.", context: "Parlez du nombre de frères et sœurs que vous avez." },
      { english: "My grandmother lives in the village.", context: "Décrivez où vivent les membres de votre famille." },
      { english: "We eat dinner together as a family.", context: "Parlez des activités familiales." },
    ],
    exercises: [
      // 1-3: Easy (vocabulary recognition)
      {
        type: "tap_to_select",
        question: "Appuyez sur le mot pour un parent féminin :",
        options: ["Brother", "Father", "Uncle", "Mother"],
        correctAnswer: "Mother",
        hint: "C'est la femme qui vous a donné naissance.",
        audioText: "Tap the word for a female parent.",
      },
      {
        type: "tap_to_select",
        question: "Appuyez sur le mot pour un très jeune enfant :",
        options: ["Sister", "Baby", "Uncle", "Brother"],
        correctAnswer: "Baby",
        hint: "C'est le plus jeune membre d'une famille.",
        audioText: "Tap the word for a very small child.",
      },
      {
        type: "multiple_choice",
        question: "Kofi dit « This is my father. ». De qui parle-t-il ?",
        options: ["His male parent", "His sister", "His teacher", "His friend"],
        correctAnswer: "His male parent",
        hint: "Un père est un parent masculin.",
        audioText: "Kofi says, this is my father. Who is he talking about?",
      },
      // 4-6: Medium (sentence completion & context)
      {
        type: "multiple_choice",
        question: "« I have two brothers and one sister. » Combien de frères et sœurs au total ?",
        options: ["One", "Two", "Three", "Four"],
        correctAnswer: "Three",
        hint: "Comptez les frères et la sœur.",
        audioText: "I have two brothers and one sister. How many siblings total?",
      },
      {
        type: "tap_to_select",
        question: "Appuyez sur le mot pour le frère de votre parent :",
        options: ["Father", "Brother", "Uncle", "Grandmother"],
        correctAnswer: "Uncle",
        hint: "Cet homme est le frère de votre parent.",
        audioText: "Tap the word for your parent's brother.",
      },
      {
        type: "listen_repeat",
        question: "Écoutez et choisissez la bonne phrase :",
        options: ["My grandmother lives in the village.", "I take the bus to school.", "How much is the rice?", "Today is Monday."],
        correctAnswer: "My grandmother lives in the village.",
        hint: "Cette phrase parle d'un membre plus âgé de la famille.",
        audioText: "My grandmother lives in the village.",
      },
      // 7-10: Harder (grammar basics, contextual understanding, listening comprehension)
      {
        type: "multiple_choice",
        question: "Amara dit : « My mother is a teacher. ». Que fait la mère d'Amara ?",
        options: ["She sells at the market", "She teaches students", "She drives a taxi", "She works at the clinic"],
        correctAnswer: "She teaches students",
        hint: "Un enseignant travaille dans une école.",
        audioText: "Amara says, my mother is a teacher. What does Amara's mother do?",
      },
      {
        type: "multiple_choice",
        question: "Youssef a une sœur nommée Zuri et un frère nommé Chidi. Zuri a un bébé. Combien de personnes composent la famille immédiate d'Youssef avec les parents, les frères et sœurs et le bébé ?",
        options: ["Three", "Four", "Five", "Six"],
        correctAnswer: "Six",
        hint: "Comptez : mère, père, Youssef, sœur, frère et bébé. Cela fait six personnes.",
        audioText: "Youssef has one sister named Zuri and one brother named Chidi. Zuri has a baby. How many people are in Youssef's immediate family with parents, siblings, and baby?",
      },
      {
        type: "listen_repeat",
        question: "Écoutez et choisissez la bonne phrase :",
        options: ["We eat dinner together as a family.", "I need to buy a ticket.", "The doctor is very kind.", "My uncle lives in Accra."],
        correctAnswer: "We eat dinner together as a family.",
        hint: "Cette phrase décrit une activité familiale.",
        audioText: "We eat dinner together as a family.",
      },
      {
        type: "listen_repeat",
        question: "Écoutez et choisissez la bonne phrase :",
        options: ["This is my mother. She is a teacher.", "The market is very far.", "Drink water when you are thirsty.", "Go straight and turn left."],
        correctAnswer: "This is my mother. She is a teacher.",
        hint: "Cette phrase présente un membre de la famille et son métier.",
        audioText: "This is my mother. She is a teacher.",
      },
    ],
  },

  // ============================================================
  // LESSON 4: Numbers & Counting
  // ============================================================
  {
    title: "Numbers & Counting",
    description: "Apprenez à compter de un à dix et à utiliser les nombres dans les situations du quotidien.",
    topic: "Basics",
    icon: "🔢",
    color: "#1CB0F6",
    order: 4,
    xpReward: 50,
    vocabulary: [
      { word: "One", translation: "Un", pronunciation: "wun", example: "I want one orange." },
      { word: "Two", translation: "Deux", pronunciation: "too", example: "Give me two eggs, please." },
      { word: "Three", translation: "Trois", pronunciation: "three", example: "I have three children." },
      { word: "Four", translation: "Quatre", pronunciation: "for", example: "There are four chairs." },
      { word: "Five", translation: "Cinq", pronunciation: "fyv", example: "Five cedis, please." },
      { word: "Six", translation: "Six", pronunciation: "siks", example: "The shop opens at six." },
      { word: "Seven", translation: "Sept", pronunciation: "SEV-en", example: "My sister is seven years old." },
      { word: "Eight", translation: "Huit", pronunciation: "ayt", example: "I need eight books." },
      { word: "Nine", translation: "Neuf", pronunciation: "nyn", example: "There are nine students." },
      { word: "Ten", translation: "Dix", pronunciation: "ten", example: "Ten cedis for the rice." },
    ],
    sentences: [
      { english: "I want to buy three mangoes, please.", context: "Utilisez les nombres pour acheter des choses au marché." },
      { english: "My baby sister is two years old.", context: "Dites l'âge de quelqu'un en utilisant les nombres." },
      { english: "There are five people in my family.", context: "Comptez les personnes en utilisant les nombres." },
      { english: "The bus leaves at seven o'clock.", context: "Utilisez les nombres pour l'heure." },
      { english: "I need ten bags of rice for the party.", context: "Utilisez les nombres pour les quantités." },
    ],
    exercises: [
      // 1-3: Easy (vocabulary recognition)
      {
        type: "tap_to_select",
        question: "Appuyez sur le nombre qui vient après six :",
        options: ["Five", "Seven", "Eight", "Nine"],
        correctAnswer: "Seven",
        hint: "Comptez à partir de un : un, deux, trois, quatre, cinq, six...",
        audioText: "Tap the number that comes after six.",
      },
      {
        type: "tap_to_select",
        question: "Appuyez sur le nombre qui vient avant quatre :",
        options: ["Two", "Five", "Three", "Six"],
        correctAnswer: "Three",
        hint: "Comptez à rebours à partir de cinq : cinq, quatre...",
        audioText: "Tap the number that comes before four.",
      },
      {
        type: "multiple_choice",
        question: "Amina veut acheter 3 mangues et 2 oranges. Combien de fruits au total ?",
        options: ["Three", "Four", "Five", "Six"],
        correctAnswer: "Five",
        hint: "Additionnez trois et deux.",
        audioText: "Amina wants to buy three mangoes and two oranges. How many fruits total?",
      },
      // 4-6: Medium (sentence completion & context)
      {
        type: "multiple_choice",
        question: "La petite sœur de Fatima a deux ans. Son frère Kwame a cinq ans de plus. Quel âge a Kwame ?",
        options: ["Two", "Five", "Seven", "Ten"],
        correctAnswer: "Seven",
        hint: "Additionnez deux et cinq.",
        audioText: "Fatima's baby sister is two years old. Her brother Kwame is five years older. How old is Kwame?",
      },
      {
        type: "tap_to_select",
        question: "Appuyez sur le nombre de jours dans une semaine :",
        options: ["Five", "Six", "Seven", "Ten"],
        correctAnswer: "Seven",
        hint: "Lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche.",
        audioText: "Tap the number of days in one week.",
      },
      {
        type: "listen_repeat",
        question: "Écoutez et choisissez la bonne phrase :",
        options: ["I need one book.", "I have five children.", "She is ten years old.", "There are three chairs."],
        correctAnswer: "I have five children.",
        hint: "Cette phrase parle du nombre d'enfants.",
        audioText: "I have five children.",
      },
      // 7-10: Harder (grammar basics, contextual understanding, listening comprehension)
      {
        type: "multiple_choice",
        question: "Emeka achète quatre tomates à 2 cedis pièce. Combien paie-t-il au total ?",
        options: ["Four cedis", "Six cedis", "Eight cedis", "Ten cedis"],
        correctAnswer: "Eight cedis",
        hint: "Quatre tomates multipliées par deux cedis égalent huit cedis.",
        audioText: "Emeka buys four tomatoes at 2 cedis each. How much does he pay in total?",
      },
      {
        type: "multiple_choice",
        question: "Il y a dix élèves dans la classe de Mme Okafor. Trois sont absents aujourd'hui. Combien d'élèves sont en classe ?",
        options: ["Three", "Five", "Seven", "Ten"],
        correctAnswer: "Seven",
        hint: "Dix moins trois égalent sept.",
        audioText: "There are ten students in Mrs. Okafor's class. Three are absent today. How many students are in class?",
      },
      {
        type: "listen_repeat",
        question: "Écoutez et choisissez la bonne phrase :",
        options: ["The bus leaves at seven o'clock.", "I want to buy fresh tomatoes.", "My mother is a teacher.", "Turn left at the corner."],
        correctAnswer: "The bus leaves at seven o'clock.",
        hint: "Cette phrase utilise un nombre pour donner l'heure.",
        audioText: "The bus leaves at seven o'clock.",
      },
      {
        type: "listen_repeat",
        question: "Écoutez et choisissez la bonne phrase :",
        options: ["I need ten bags of rice for the party.", "My name is Kofi.", "I have a headache.", "Today is Saturday."],
        correctAnswer: "I need ten bags of rice for the party.",
        hint: "Cette phrase utilise un nombre pour parler d'une quantité.",
        audioText: "I need ten bags of rice for the party.",
      },
    ],
  },

  // ============================================================
  // LESSON 5: At School
  // ============================================================
  {
    title: "At School",
    description: "Apprenez les mots pour la salle de classe, les activités scolaires et parler de l'éducation.",
    topic: "Education",
    icon: "🏫",
    color: "#FF4B4B",
    order: 5,
    xpReward: 50,
    vocabulary: [
      { word: "Teacher", translation: "Enseignant(e)", pronunciation: "TEE-cher", example: "The teacher is very kind." },
      { word: "Student", translation: "Élève / Étudiant(e)", pronunciation: "STYOO-dent", example: "I am a good student." },
      { word: "Book", translation: "Livre", pronunciation: "book", example: "Please open your book." },
      { word: "Pen", translation: "Stylo", pronunciation: "pen", example: "I need a pen to write." },
      { word: "Classroom", translation: "Salle de classe", pronunciation: "KLASS-room", example: "The classroom is big." },
      { word: "Read", translation: "Lire", pronunciation: "reed", example: "Please read page ten." },
      { word: "Write", translation: "Écrire", pronunciation: "ryt", example: "Write your name here." },
      { word: "Homework", translation: "Devoirs", pronunciation: "HOME-wurk", example: "I must do my homework." },
    ],
    sentences: [
      { english: "Good morning, teacher! My name is Kofi.", context: "Saluez votre enseignant au début du cours." },
      { english: "Please open your book to page five.", context: "L'enseignant demande aux élèves de suivre." },
      { english: "I need a pen and a book for class.", context: "Énumérez ce dont vous avez besoin pour l'école." },
      { english: "The teacher says, please read the sentence.", context: "Un enseignant qui donne des instructions en classe." },
      { english: "I must finish my homework before dinner.", context: "Parlez de vos responsabilités à la maison." },
    ],
    exercises: [
      // 1-3: Easy (vocabulary recognition)
      {
        type: "tap_to_select",
        question: "Appuyez sur le mot pour une personne qui apprend :",
        options: ["Teacher", "Classroom", "Student", "Homework"],
        correctAnswer: "Student",
        hint: "Un élève apprend à l'école.",
        audioText: "Tap the word for a person who is learning.",
      },
      {
        type: "tap_to_select",
        question: "Appuyez sur l'objet que vous utilisez pour écrire :",
        options: ["Book", "Pen", "Classroom", "Homework"],
        correctAnswer: "Pen",
        hint: "Vous tenez cet objet dans votre main pour écrire des mots.",
        audioText: "Tap the thing you use to write with.",
      },
      {
        type: "multiple_choice",
        question: "Qui enseigne aux élèves dans une salle de classe ?",
        options: ["A doctor", "A teacher", "A driver", "A seller"],
        correctAnswer: "A teacher",
        hint: "Cette personne travaille dans une école.",
        audioText: "Who teaches students in a classroom?",
      },
      // 4-6: Medium (sentence completion & context)
      {
        type: "multiple_choice",
        question: "L'enseignant dit : « Please ___ your name on the paper. ». Quel mot manque ?",
        options: ["Eat", "Read", "Write", "Sleep"],
        correctAnswer: "Write",
        hint: "Vous utilisez un stylo pour faire cela.",
        audioText: "The teacher says, please blank your name on the paper. What word is missing?",
      },
      {
        type: "tap_to_select",
        question: "Appuyez sur le travail que vous faites à la maison après l'école :",
        options: ["Read", "Homework", "Classroom", "Book"],
        correctAnswer: "Homework",
        hint: "C'est le travail scolaire que vous faites à la maison.",
        audioText: "Tap the work you do at home after school.",
      },
      {
        type: "listen_repeat",
        question: "Écoutez et choisissez la bonne phrase :",
        options: ["Please open your book to page five.", "I want to buy rice.", "The bus is here.", "My head hurts."],
        correctAnswer: "Please open your book to page five.",
        hint: "C'est quelque chose qu'un enseignant dit en classe.",
        audioText: "Please open your book to page five.",
      },
      // 7-10: Harder (grammar basics, contextual understanding, listening comprehension)
      {
        type: "multiple_choice",
        question: "Amara a besoin de deux choses pour la classe : une pour lire et une pour écrire. De quoi a-t-elle besoin ?",
        options: ["A pen and a classroom", "A book and a pen", "Homework and a teacher", "A book and homework"],
        correctAnswer: "A book and a pen",
        hint: "Vous lisez dans un livre et vous écrivez avec un stylo.",
        audioText: "Amara needs two things for class: one to read and one to write with. What does she need?",
      },
      {
        type: "multiple_choice",
        question: "Mme Okafor demande à Kofi de lire la page dix. Kofi lit la page cinq. Que devrait faire Kofi ?",
        options: ["Stop reading", "Read page ten instead", "Close his book", "Go home"],
        correctAnswer: "Read page ten instead",
        hint: "L'enseignante lui a demandé de lire la page dix, pas la page cinq.",
        audioText: "Mrs. Okafor tells Kofi to read page ten. Kofi reads page five. What should Kofi do?",
      },
      {
        type: "listen_repeat",
        question: "Écoutez et choisissez la bonne phrase :",
        options: ["I must finish my homework before dinner.", "My uncle lives in Accra.", "The chicken is delicious.", "Go straight and turn left."],
        correctAnswer: "I must finish my homework before dinner.",
        hint: "Cette phrase parle de la responsabilité d'un élève à la maison.",
        audioText: "I must finish my homework before dinner.",
      },
      {
        type: "listen_repeat",
        question: "Écoutez et choisissez la bonne phrase :",
        options: ["Good morning, teacher! My name is Kofi.", "I want to sell fresh fish.", "The taxi is waiting.", "I am lost."],
        correctAnswer: "Good morning, teacher! My name is Kofi.",
        hint: "C'est ainsi qu'un élève salue l'enseignant.",
        audioText: "Good morning, teacher! My name is Kofi.",
      },
    ],
  },

  // ============================================================
  // LESSON 6: At the Clinic
  // ============================================================
  {
    title: "At the Clinic",
    description: "Apprenez les mots pour la santé, la clinique et décrire comment vous vous sentez.",
    topic: "Health",
    icon: "🏥",
    color: "#49C0B8",
    order: 6,
    xpReward: 50,
    vocabulary: [
      { word: "Doctor", translation: "Médecin / Docteur", pronunciation: "DOC-ter", example: "The doctor is very kind." },
      { word: "Nurse", translation: "Infirmier / Infirmière", pronunciation: "nurs", example: "The nurse gave me medicine." },
      { word: "Sick", translation: "Malade", pronunciation: "sik", example: "I feel sick today." },
      { word: "Medicine", translation: "Médicament", pronunciation: "MED-ih-sin", example: "Take your medicine every day." },
      { word: "Hospital", translation: "Hôpital", pronunciation: "HOS-pih-tul", example: "Go to the hospital now." },
      { word: "Headache", translation: "Mal de tête", pronunciation: "HED-ayk", example: "I have a bad headache." },
      { word: "Fever", translation: "Fièvre", pronunciation: "FEE-ver", example: "The baby has a fever." },
      { word: "Healthy", translation: "En bonne santé", pronunciation: "HEL-thee", example: "Eat well to stay healthy." },
    ],
    sentences: [
      { english: "Good morning, doctor. I feel sick.", context: "Dites au médecin comment vous vous sentez quand vous visitez la clinique." },
      { english: "I have a headache and a fever.", context: "Décrivez vos symptômes au médecin ou à l'infirmier/infirmière." },
      { english: "The nurse says, take this medicine twice a day.", context: "Suivez les instructions de l'infirmier/infirmière pour les médicaments." },
      { english: "My mother took the baby to the hospital.", context: "Parlez de quelqu'un qui va chercher de l'aide médicale." },
      { english: "Eat fruits and vegetables to stay healthy.", context: "Donnez des conseils de santé avec des mots simples." },
    ],
    exercises: [
      // 1-3: Easy (vocabulary recognition)
      {
        type: "tap_to_select",
        question: "Appuyez sur la personne qui aide les malades à la clinique :",
        options: ["Teacher", "Driver", "Doctor", "Seller"],
        correctAnswer: "Doctor",
        hint: "Cette personne travaille dans un hôpital ou une clinique.",
        audioText: "Tap the person who helps sick people at the clinic.",
      },
      {
        type: "tap_to_select",
        question: "Appuyez sur le mot qui signifie « pas bien, avoir une maladie » :",
        options: ["Healthy", "Sick", "Medicine", "Nurse"],
        correctAnswer: "Sick",
        hint: "Quand vous ne vous sentez pas bien, vous êtes cela.",
        audioText: "Tap the word that means not well, having an illness.",
      },
      {
        type: "multiple_choice",
        question: "Amina se sent malade. Où devrait-elle aller ?",
        options: ["The market", "The school", "The clinic", "The bus station"],
        correctAnswer: "The clinic",
        hint: "C'est un endroit pour obtenir de l'aide médicale.",
        audioText: "Amina feels sick. Where should she go?",
      },
      // 4-6: Medium (sentence completion & context)
      {
        type: "multiple_choice",
        question: "La tête de Kofi fait très mal. Qu'a-t-il ?",
        options: ["A fever", "A headache", "Medicine", "A classroom"],
        correctAnswer: "A headache",
        hint: "Ce mot signifie une douleur dans la tête.",
        audioText: "Kofi's head hurts very much. What does he have?",
      },
      {
        type: "tap_to_select",
        question: "Appuyez sur ce que l'infirmier/infirmière vous donne pour vous sentir mieux :",
        options: ["A book", "Medicine", "A ticket", "Money"],
        correctAnswer: "Medicine",
        hint: "Vous prenez cela quand vous êtes malade pour guérir.",
        audioText: "Tap the thing the nurse gives you to feel better.",
      },
      {
        type: "listen_repeat",
        question: "Écoutez et choisissez la bonne phrase :",
        options: ["I want to buy rice.", "My name is Kofi.", "I have a headache and a fever.", "The book is on the table."],
        correctAnswer: "I have a headache and a fever.",
        hint: "Cette phrase décrit des problèmes de santé.",
        audioText: "I have a headache and a fever.",
      },
      // 7-10: Harder (grammar basics, contextual understanding, listening comprehension)
      {
        type: "multiple_choice",
        question: "Le bébé de Fatima a très chaud et l'infirmière dit que le bébé a une température élevée. Qu'a le bébé ?",
        options: ["A headache", "A fever", "Medicine", "A healthy body"],
        correctAnswer: "A fever",
        hint: "Quand la température de votre corps est trop élevée, vous avez cela.",
        audioText: "Fatima's baby feels very hot and the nurse says the baby has a high temperature. What does the baby have?",
      },
      {
        type: "multiple_choice",
        question: "Amara mange des fruits et des légumes chaque jour. Elle fait de l'exercice et boit de l'eau. Comment est Amara ?",
        options: ["Sick", "Lost", "Hungry", "Healthy"],
        correctAnswer: "Healthy",
        hint: "Quand vous prenez bien soin de votre corps, vous êtes cela.",
        audioText: "Amara eats fruits and vegetables every day. She exercises and drinks water. How is Amara?",
      },
      {
        type: "listen_repeat",
        question: "Écoutez et choisissez la bonne phrase :",
        options: ["Good morning, doctor. I feel sick.", "I go to the market on Saturday.", "The teacher is very kind.", "My uncle lives in Accra."],
        correctAnswer: "Good morning, doctor. I feel sick.",
        hint: "C'est ce que vous dites quand vous visitez la clinique.",
        audioText: "Good morning, doctor. I feel sick.",
      },
      {
        type: "listen_repeat",
        question: "Écoutez et choisissez la bonne phrase :",
        options: ["My mother took the baby to the hospital.", "I need a pen and a book.", "The market sells fresh fish.", "How much is the bus fare?"],
        correctAnswer: "My mother took the baby to the hospital.",
        hint: "Cette phrase parle d'emmener un membre de la famille chercher de l'aide médicale.",
        audioText: "My mother took the baby to the hospital.",
      },
    ],
  },

  // ============================================================
  // LESSON 7: Transportation
  // ============================================================
  {
    title: "Transportation",
    description: "Apprenez les mots pour les bus, les taxis, les motos et se déplacer en ville.",
    topic: "Getting Around",
    icon: "🚌",
    color: "#FF86D0",
    order: 7,
    xpReward: 50,
    vocabulary: [
      { word: "Bus", translation: "Bus", pronunciation: "bus", example: "I take the bus to school." },
      { word: "Taxi", translation: "Taxi", pronunciation: "TAK-see", example: "The taxi is waiting outside." },
      { word: "Motorbike", translation: "Moto", pronunciation: "MOH-toh-byk", example: "My brother rides a motorbike." },
      { word: "Road", translation: "Route / Rue", pronunciation: "rohd", example: "The road to the market is long." },
      { word: "Station", translation: "Gare / Station", pronunciation: "STAY-shun", example: "Wait for me at the bus station." },
      { word: "Ticket", translation: "Billet", pronunciation: "TIK-et", example: "I need a ticket to Lagos." },
      { word: "Stop", translation: "Arrêt", pronunciation: "stop", example: "The bus will stop here." },
      { word: "Fare", translation: "Tarif", pronunciation: "fair", example: "The bus fare is fifty cedis." },
    ],
    sentences: [
      { english: "I take the bus to school every morning.", context: "Décrivez comment vous vous rendez à l'école." },
      { english: "How much is the taxi fare to the market?", context: "Demandez le coût du transport." },
      { english: "The motorbike is faster than the bus.", context: "Comparez différents types de transport." },
      { english: "Please stop the bus at the next station.", context: "Demandez au chauffeur de vous laisser descendre." },
      { english: "I need to buy a ticket to visit my grandmother.", context: "Parlez d'achat de billets pour voyager." },
    ],
    exercises: [
      // 1-3: Easy (vocabulary recognition)
      {
        type: "tap_to_select",
        question: "Appuyez sur le mot pour le coût d'un trajet :",
        options: ["Station", "Road", "Ticket", "Fare"],
        correctAnswer: "Fare",
        hint: "C'est l'argent que vous payez pour voyager.",
        audioText: "Tap the word for the cost of a ride.",
      },
      {
        type: "tap_to_select",
        question: "Appuyez sur le véhicule à deux roues que Chidi conduit :",
        options: ["Bus", "Taxi", "Motorbike", "Ticket"],
        correctAnswer: "Motorbike",
        hint: "C'est un véhicule à deux roues.",
        audioText: "Tap the vehicle with two wheels that Chidi rides.",
      },
      {
        type: "multiple_choice",
        question: "Kofi doit aller à l'école. Quel véhicule transporte beaucoup de personnes ?",
        options: ["A motorbike", "A bicycle", "A bus", "A car"],
        correctAnswer: "A bus",
        hint: "Ce grand véhicule transporte de nombreux passagers.",
        audioText: "Kofi needs to go to school. Which vehicle carries many people?",
      },
      // 4-6: Medium (sentence completion & context)
      {
        type: "multiple_choice",
        question: "Amina est dans un bus. Elle dit « Please stop here. ». Que veut-elle ?",
        options: ["The bus to go faster", "The bus to stop so she can get off", "To buy more tickets", "To sleep on the bus"],
        correctAnswer: "The bus to stop so she can get off",
        hint: "Elle veut descendre du bus à cet endroit.",
        audioText: "Amina is on a bus. She says, please stop here. What does she want?",
      },
      {
        type: "tap_to_select",
        question: "Appuyez sur l'endroit où vous attendez un bus :",
        options: ["Road", "Fare", "Station", "Stop"],
        correctAnswer: "Station",
        hint: "C'est un bâtiment ou une zone d'où partent les bus et les trains.",
        audioText: "Tap the place where you wait for a bus.",
      },
      {
        type: "listen_repeat",
        question: "Écoutez et choisissez la bonne phrase :",
        options: ["I take the bus to school every morning.", "I want to eat jollof rice.", "My mother is a teacher.", "The baby is sleeping."],
        correctAnswer: "I take the bus to school every morning.",
        hint: "Cette phrase décrit l'utilisation des transports pour aller à l'école.",
        audioText: "I take the bus to school every morning.",
      },
      // 7-10: Harder (grammar basics, contextual understanding, listening comprehension)
      {
        type: "multiple_choice",
        question: "Youssef veut rendre visite à sa grand-mère dans la ville voisine. Il va à la gare et demande un ___ pour pouvoir voyager. De quoi a-t-il besoin ?",
        options: ["Fare", "Ticket", "Road", "Stop"],
        correctAnswer: "Ticket",
        hint: "Vous avez besoin de ce papier pour prouver que vous avez payé votre trajet.",
        audioText: "Youssef wants to visit his grandmother in the next town. He goes to the station and asks for something so he can travel. What does he need?",
      },
      {
        type: "multiple_choice",
        question: "Emeka prend la moto pour aller à la clinique parce que c'est plus rapide que le bus. Quel mot compare les deux véhicules ?",
        options: ["Faster", "Expensive", "Fresh", "Healthy"],
        correctAnswer: "Faster",
        hint: "Ce mot signifie que quelque chose se déplace plus vite.",
        audioText: "Emeka rides a motorbike to the clinic because it is faster than the bus. Which word compares the two vehicles?",
      },
      {
        type: "listen_repeat",
        question: "Écoutez et choisissez la bonne phrase :",
        options: ["How much is the taxi fare to the market?", "I have a headache and a fever.", "Please open your book.", "Today is Friday."],
        correctAnswer: "How much is the taxi fare to the market?",
        hint: "Cette phrase demande le coût du transport.",
        audioText: "How much is the taxi fare to the market?",
      },
      {
        type: "listen_repeat",
        question: "Écoutez et choisissez la bonne phrase :",
        options: ["I need to buy a ticket to visit my grandmother.", "The food at the market is fresh.", "My sister is seven years old.", "Turn left at the corner."],
        correctAnswer: "I need to buy a ticket to visit my grandmother.",
        hint: "Cette phrase parle d'acheter quelque chose pour voyager.",
        audioText: "I need to buy a ticket to visit my grandmother.",
      },
    ],
  },

  // ============================================================
  // LESSON 8: Food & Drinks
  // ============================================================
  {
    title: "Food & Drinks",
    description: "Apprenez les mots pour les aliments et boissons africains courants et parler des repas.",
    topic: "Food",
    icon: "🍚",
    color: "#FFC800",
    order: 8,
    xpReward: 50,
    vocabulary: [
      { word: "Rice", translation: "Riz", pronunciation: "rys", example: "I love jollof rice." },
      { word: "Water", translation: "Eau", pronunciation: "WAW-ter", example: "Please give me water." },
      { word: "Eat", translation: "Manger", pronunciation: "eet", example: "We eat together as a family." },
      { word: "Drink", translation: "Boire", pronunciation: "drink", example: "Drink water when you are thirsty." },
      { word: "Hungry", translation: "Affamé(e)", pronunciation: "HUNG-ree", example: "I am very hungry." },
      { word: "Thirsty", translation: "Avoir soif", pronunciation: "THUR-stee", example: "The children are thirsty after playing." },
      { word: "Bread", translation: "Pain", pronunciation: "bred", example: "I eat bread and tea for breakfast." },
      { word: "Chicken", translation: "Poulet", pronunciation: "CHIK-en", example: "My mother cooks chicken for dinner." },
    ],
    sentences: [
      { english: "I am hungry. I want to eat jollof rice.", context: "Exprimez que vous voulez de la nourriture." },
      { english: "Please give me a glass of water. I am thirsty.", context: "Demandez quelque chose à boire." },
      { english: "My mother cooks rice and chicken for Sunday dinner.", context: "Décrivez un repas familial." },
      { english: "We eat bread and drink tea every morning.", context: "Parlez du petit-déjeuner." },
      { english: "The food at the market is fresh and delicious.", context: "Faites un compliment sur la nourriture du marché." },
    ],
    exercises: [
      // 1-3: Easy (vocabulary recognition)
      {
        type: "tap_to_select",
        question: "Appuyez sur le plat de riz ouest-africain populaire :",
        options: ["Bread", "Water", "Jollof rice", "Chicken"],
        correctAnswer: "Jollof rice",
        hint: "C'est un plat de riz très célèbre en Afrique de l'Ouest.",
        audioText: "Tap the popular West African rice dish.",
      },
      {
        type: "tap_to_select",
        question: "Appuyez sur ce que vous faites quand votre estomac réclame de la nourriture :",
        options: ["Drink", "Sleep", "Eat", "Read"],
        correctAnswer: "Eat",
        hint: "Vous mettez de la nourriture dans votre bouche et faites cela.",
        audioText: "Tap what you do when your stomach wants food.",
      },
      {
        type: "multiple_choice",
        question: "Kofi dit « I am hungry. ». De quoi a-t-il besoin ?",
        options: ["Water to drink", "Medicine", "Food to eat", "A book to read"],
        correctAnswer: "Food to eat",
        hint: "Affamé signifie que vous avez besoin de nourriture.",
        audioText: "Kofi says, I am hungry. What does he need?",
      },
      // 4-6: Medium (sentence completion & context)
      {
        type: "multiple_choice",
        question: "Après avoir joué au football sous le soleil chaud, Amara veut de l'eau. Comment se sent Amara ?",
        options: ["Hungry", "Thirsty", "Sick", "Lost"],
        correctAnswer: "Thirsty",
        hint: "Quand vous voulez boire quelque chose, vous ressentez cela.",
        audioText: "After playing football in the hot sun, Amara wants water. How does Amara feel?",
      },
      {
        type: "tap_to_select",
        question: "Appuyez sur la nourriture que Maman prépare pour le dîner du dimanche :",
        options: ["Water", "Bread", "Chicken", "Medicine"],
        correctAnswer: "Chicken",
        hint: "C'est une viande populaire que les familles mangent au dîner.",
        audioText: "Tap the food that Mama cooks for Sunday dinner.",
      },
      {
        type: "listen_repeat",
        question: "Écoutez et choisissez la bonne phrase :",
        options: ["My mother drives a taxi.", "I am thirsty. Please give me water.", "The bus is at the station.", "How much is this book?"],
        correctAnswer: "I am thirsty. Please give me water.",
        hint: "Cette phrase demande quelque chose à boire.",
        audioText: "I am thirsty. Please give me water.",
      },
      // 7-10: Harder (grammar basics, contextual understanding, listening comprehension)
      {
        type: "multiple_choice",
        question: "Nala a faim et soif. Elle veut du riz et de l'eau. Que devrait-elle faire avec le riz et que devrait-elle faire avec l'eau ?",
        options: ["Eat the rice and drink the water", "Drink the rice and eat the water", "Eat both the rice and the water", "Drink both the rice and the water"],
        correctAnswer: "Eat the rice and drink the water",
        hint: "On mange les aliments solides et on boit les liquides.",
        audioText: "Nala is hungry and thirsty. She wants rice and water. What should she do with the rice and what should she do with the water?",
      },
      {
        type: "multiple_choice",
        question: "Kwame mange du pain et boit du thé chaque matin. Quel repas est-ce ?",
        options: ["Lunch", "Dinner", "Breakfast", "Snack"],
        correctAnswer: "Breakfast",
        hint: "C'est le premier repas de la journée, le matin.",
        audioText: "Kwame eats bread and drinks tea every morning. What meal is this?",
      },
      {
        type: "listen_repeat",
        question: "Écoutez et choisissez la bonne phrase :",
        options: ["My mother cooks rice and chicken for Sunday dinner.", "I need a ticket to Lagos.", "The classroom is very big.", "Go straight and turn right."],
        correctAnswer: "My mother cooks rice and chicken for Sunday dinner.",
        hint: "Cette phrase décrit un repas familial un jour spécial.",
        audioText: "My mother cooks rice and chicken for Sunday dinner.",
      },
      {
        type: "listen_repeat",
        question: "Écoutez et choisissez la bonne phrase :",
        options: ["I am hungry. I want to eat jollof rice.", "Please stop the bus here.", "I have two brothers.", "The nurse gave me medicine."],
        correctAnswer: "I am hungry. I want to eat jollof rice.",
        hint: "Cette phrase exprime que quelqu'un veut de la nourriture.",
        audioText: "I am hungry. I want to eat jollof rice.",
      },
    ],
  },

  // ============================================================
  // LESSON 9: Days of the Week
  // ============================================================
  {
    title: "Days of the Week",
    description: "Apprenez les sept jours de la semaine et comment parler de votre routine hebdomadaire.",
    topic: "Time",
    icon: "📅",
    color: "#A1A1AA",
    order: 9,
    xpReward: 50,
    vocabulary: [
      { word: "Monday", translation: "Lundi", pronunciation: "MUN-day", example: "School starts on Monday." },
      { word: "Tuesday", translation: "Mardi", pronunciation: "TOOZ-day", example: "I go to the market on Tuesday." },
      { word: "Wednesday", translation: "Mercredi", pronunciation: "WENZ-day", example: "We have English class on Wednesday." },
      { word: "Thursday", translation: "Jeudi", pronunciation: "THURZ-day", example: "My father comes home on Thursday." },
      { word: "Friday", translation: "Vendredi", pronunciation: "FRY-day", example: "Friday is my favourite day!" },
      { word: "Saturday", translation: "Samedi", pronunciation: "SAT-ur-day", example: "I play football on Saturday." },
      { word: "Sunday", translation: "Dimanche", pronunciation: "SUN-day", example: "We go to church on Sunday." },
      { word: "Today", translation: "Aujourd'hui", pronunciation: "tuh-DAY", example: "Today is a beautiful day." },
      { word: "Tomorrow", translation: "Demain", pronunciation: "tuh-MOR-oh", example: "I will go to school tomorrow." },
    ],
    sentences: [
      { english: "Today is Monday. I go to school.", context: "Dites quel jour c'est et ce que vous faites." },
      { english: "I go to the market every Saturday.", context: "Parlez d'une routine hebdomadaire." },
      { english: "Tomorrow is Sunday. We will go to church.", context: "Planifiez pour le jour suivant." },
      { english: "My favourite day is Friday because school finishes early.", context: "Expliquez pourquoi vous aimez un certain jour." },
      { english: "On Wednesday, we have an English test.", context: "Parlez des événements scolaires à des jours précis." },
    ],
    exercises: [
      // 1-3: Easy (vocabulary recognition)
      {
        type: "tap_to_select",
        question: "Appuyez sur le jour qui vient après jeudi :",
        options: ["Wednesday", "Monday", "Friday", "Sunday"],
        correctAnswer: "Friday",
        hint: "Comptez les jours dans l'ordre.",
        audioText: "Tap the day that comes after Thursday.",
      },
      {
        type: "tap_to_select",
        question: "Appuyez sur le jour qui vient avant lundi :",
        options: ["Tuesday", "Saturday", "Sunday", "Friday"],
        correctAnswer: "Sunday",
        hint: "Dimanche est le dernier jour de la semaine, avant que lundi ne commence une nouvelle semaine.",
        audioText: "Tap the day that comes before Monday.",
      },
      {
        type: "multiple_choice",
        question: "Si aujourd'hui est lundi, quel jour est demain ?",
        options: ["Sunday", "Tuesday", "Wednesday", "Saturday"],
        correctAnswer: "Tuesday",
        hint: "Mardi vient après lundi.",
        audioText: "If today is Monday, what day is tomorrow?",
      },
      // 4-6: Medium (sentence completion & context)
      {
        type: "multiple_choice",
        question: "Amina dit « I go to the market every Saturday. ». Quand y va-t-elle ?",
        options: ["Monday", "Wednesday", "The day after Friday", "Sunday"],
        correctAnswer: "The day after Friday",
        hint: "Samedi est le jour après vendredi.",
        audioText: "Amina says, I go to the market every Saturday. When does she go?",
      },
      {
        type: "tap_to_select",
        question: "Appuyez sur le jour qui est le dernier jour de la semaine :",
        options: ["Friday", "Saturday", "Sunday", "Monday"],
        correctAnswer: "Sunday",
        hint: "Dimanche est le septième et dernier jour de la semaine.",
        audioText: "Tap the day that is the last day of the week.",
      },
      {
        type: "listen_repeat",
        question: "Écoutez et choisissez la bonne phrase :",
        options: ["Today is Monday. I go to school.", "I want to buy fresh tomatoes.", "The doctor is very kind.", "My name is Amina."],
        correctAnswer: "Today is Monday. I go to school.",
        hint: "Cette phrase indique quel jour c'est et ce que la personne fait.",
        audioText: "Today is Monday. I go to school.",
      },
      // 7-10: Harder (grammar basics, contextual understanding, listening comprehension)
      {
        type: "multiple_choice",
        question: "Kofi a un examen d'anglais le mercredi. Aujourd'hui est lundi. Combien de jours avant l'examen ?",
        options: ["One day", "Two days", "Three days", "Four days"],
        correctAnswer: "Two days",
        hint: "Lundi, puis mardi, puis mercredi. Cela fait deux jours à partir de lundi.",
        audioText: "Kofi has an English test on Wednesday. Today is Monday. How many days until the test?",
      },
      {
        type: "multiple_choice",
        question: "Zuri dit : « Tomorrow is Sunday. We will go to church. ». Si demain est dimanche, quel jour est aujourd'hui ?",
        options: ["Friday", "Saturday", "Monday", "Wednesday"],
        correctAnswer: "Saturday",
        hint: "Le jour avant dimanche est samedi.",
        audioText: "Zuri says, tomorrow is Sunday. We will go to church. If tomorrow is Sunday, what day is today?",
      },
      {
        type: "listen_repeat",
        question: "Écoutez et choisissez la bonne phrase :",
        options: ["My favourite day is Friday because school finishes early.", "The motorbike is very fast.", "I need a pen for class.", "How much is the ticket?"],
        correctAnswer: "My favourite day is Friday because school finishes early.",
        hint: "Cette phrase explique pourquoi quelqu'un aime un certain jour.",
        audioText: "My favourite day is Friday because school finishes early.",
      },
      {
        type: "listen_repeat",
        question: "Écoutez et choisissez la bonne phrase :",
        options: ["Tomorrow is Sunday. We will go to church.", "I have a headache and a fever.", "Please open your book to page five.", "The taxi is waiting outside."],
        correctAnswer: "Tomorrow is Sunday. We will go to church.",
        hint: "Cette phrase parle de la planification pour le jour suivant.",
        audioText: "Tomorrow is Sunday. We will go to church.",
      },
    ],
  },

  // ============================================================
  // LESSON 10: Asking for Directions
  // ============================================================
  {
    title: "Asking for Directions",
    description: "Apprenez à demander et comprendre des directions pour trouver des endroits dans votre ville.",
    topic: "Getting Around",
    icon: "🗺️",
    color: "#00C853",
    order: 10,
    xpReward: 50,
    vocabulary: [
      { word: "Left", translation: "Gauche", pronunciation: "left", example: "Turn left at the church." },
      { word: "Right", translation: "Droite", pronunciation: "ryt", example: "The market is on the right." },
      { word: "Straight", translation: "Tout droit", pronunciation: "strayt", example: "Go straight for two minutes." },
      { word: "Near", translation: "Près", pronunciation: "neer", example: "The school is near my house." },
      { word: "Far", translation: "Loin", pronunciation: "far", example: "The hospital is very far." },
      { word: "Turn", translation: "Tourner", pronunciation: "turn", example: "Turn right at the corner." },
      { word: "Corner", translation: "Coin", pronunciation: "KOR-ner", example: "The shop is on the corner." },
      { word: "Lost", translation: "Perdu(e)", pronunciation: "lost", example: "I am lost. Can you help me?" },
    ],
    sentences: [
      { english: "Excuse me, where is the market?", context: "Demandez poliment votre chemin à quelqu'un." },
      { english: "Go straight and turn left at the church.", context: "Donnez des directions simples à quelqu'un." },
      { english: "The clinic is near the school.", context: "Décrivez l'emplacement d'un lieu." },
      { english: "I am lost. Can you help me find the bus station?", context: "Demandez de l'aide quand vous ne savez pas où vous êtes." },
      { english: "The shop is on the right side of the road.", context: "Expliquez où quelque chose se trouve." },
    ],
    exercises: [
      // 1-3: Easy (vocabulary recognition)
      {
        type: "tap_to_select",
        question: "Appuyez sur le contraire de « far » (loin) :",
        options: ["Lost", "Right", "Near", "Turn"],
        correctAnswer: "Near",
        hint: "Ce mot signifie qu'un endroit est tout proche.",
        audioText: "Tap the opposite of far.",
      },
      {
        type: "tap_to_select",
        question: "Appuyez sur le mot qui signifie « ne pas savoir où l'on est » :",
        options: ["Near", "Corner", "Straight", "Lost"],
        correctAnswer: "Lost",
        hint: "Quand vous ne trouvez pas votre chemin, vous êtes cela.",
        audioText: "Tap the word that means not knowing where you are.",
      },
      {
        type: "multiple_choice",
        question: "Quelqu'un dit « Go straight and turn left. ». Que devriez-vous faire en premier ?",
        options: ["Turn left", "Turn right", "Go straight", "Stop"],
        correctAnswer: "Go straight",
        hint: "« Go straight » vient avant « turn left ».",
        audioText: "Someone says, go straight and turn left. What should you do first?",
      },
      // 4-6: Medium (sentence completion & context)
      {
        type: "multiple_choice",
        question: "Emeka demande à un homme sur la route : « Excuse me, where is the clinic? ». Que fait Emeka ?",
        options: ["Buying food", "Asking for directions", "Introducing himself", "Saying goodbye"],
        correctAnswer: "Asking for directions",
        hint: "Il veut savoir comment se rendre à un endroit.",
        audioText: "Emeka asks a man on the road, excuse me, where is the clinic? What is Emeka doing?",
      },
      {
        type: "tap_to_select",
        question: "Appuyez sur l'endroit où deux routes se croisent :",
        options: ["Station", "Corner", "Market", "Straight"],
        correctAnswer: "Corner",
        hint: "C'est l'endroit où une route tourne dans une autre direction.",
        audioText: "Tap the place where two roads meet.",
      },
      {
        type: "listen_repeat",
        question: "Écoutez et choisissez la bonne phrase :",
        options: ["I want to eat rice.", "Excuse me, where is the market?", "Today is Wednesday.", "The teacher is kind."],
        correctAnswer: "Excuse me, where is the market?",
        hint: "C'est une question pour demander son chemin.",
        audioText: "Excuse me, where is the market?",
      },
      // 7-10: Harder (grammar basics, contextual understanding, listening comprehension)
      {
        type: "multiple_choice",
        question: "Fatima veut trouver l'hôpital. Une femme lui dit : « Go straight, then turn right at the corner, then turn left. ». Dans quelle direction Fatima tourne-t-elle en premier ?",
        options: ["Left", "Right", "Straight", "She stops"],
        correctAnswer: "Right",
        hint: "La femme dit d'abord d'aller tout droit, puis de tourner à droite au coin.",
        audioText: "Fatima wants to find the hospital. A woman tells her, go straight, then turn right at the corner, then turn left. Which direction does Fatima turn first?",
      },
      {
        type: "multiple_choice",
        question: "Kofi dit « The clinic is near the school and the school is near my house. ». La clinique est-elle loin de la maison de Kofi ?",
        options: ["Yes, it is very far", "No, it is close to his house", "It is at the corner", "It is on the road"],
        correctAnswer: "No, it is close to his house",
        hint: "Si la clinique est près de l'école, et l'école est près de sa maison, la clinique est aussi proche.",
        audioText: "Kofi says, the clinic is near the school and the school is near my house. Is the clinic far from Kofi's house?",
      },
      {
        type: "listen_repeat",
        question: "Écoutez et choisissez la bonne phrase :",
        options: ["Go straight and turn left at the church.", "I need to buy a ticket.", "My sister is seven years old.", "The food is very fresh."],
        correctAnswer: "Go straight and turn left at the church.",
        hint: "Cette phrase donne des directions avec deux mouvements.",
        audioText: "Go straight and turn left at the church.",
      },
      {
        type: "listen_repeat",
        question: "Écoutez et choisissez la bonne phrase :",
        options: ["I am lost. Can you help me find the bus station?", "I am hungry. I want to eat rice.", "Please read page ten.", "The market is open on Saturday."],
        correctAnswer: "I am lost. Can you help me find the bus station?",
        hint: "Cette phrase demande de l'aide pour trouver un endroit.",
        audioText: "I am lost. Can you help me find the bus station?",
      },
    ],
  },
]

async function main() {
  console.log("🌱 Seeding AfriSpeak A1 database...\n")

  // Clear existing data
  await db.lessonProgress.deleteMany()
  await db.exercise.deleteMany()
  await db.exampleSentence.deleteMany()
  await db.vocabulary.deleteMany()
  await db.lesson.deleteMany()

  // Insert lessons
  for (const lessonData of LESSONS) {
    const lesson = await db.lesson.create({
      data: {
        title: lessonData.title,
        description: lessonData.description,
        topic: lessonData.topic,
        icon: lessonData.icon,
        color: lessonData.color,
        order: lessonData.order,
        xpReward: lessonData.xpReward,
        vocabulary: {
          create: lessonData.vocabulary.map((v, i) => ({
            word: v.word,
            translation: v.translation,
            pronunciation: v.pronunciation,
            example: v.example,
            order: i,
          })),
        },
        sentences: {
          create: lessonData.sentences.map((s, i) => ({
            english: s.english,
            context: s.context,
            order: i,
          })),
        },
        exercises: {
          create: lessonData.exercises.map((e, i) => ({
            type: e.type,
            question: e.question,
            options: JSON.stringify(e.options),
            correctAnswer: e.correctAnswer,
            hint: e.hint,
            audioText: e.audioText,
            order: i,
          })),
        },
      },
      include: { vocabulary: true, sentences: true, exercises: true },
    })

    console.log(`✅ Lesson ${lesson.order}: ${lesson.title} (${lesson.vocabulary.length} words, ${lesson.sentences.length} sentences, ${lesson.exercises.length} exercises)`)
  }

  // Create a default guest user
  const guestUser = await db.user.upsert({
    where: { id: "guest-default" },
    update: {},
    create: {
      id: "guest-default",
      name: "Guest Learner",
      email: "guest@afrispeak.a1",
      isGuest: true,
      xp: 0,
      level: 1,
      currentStreak: 0,
      longestStreak: 0,
    },
  })
  console.log(`\n👤 Default user created: ${guestUser.name}`)

  console.log("\n🎉 Seeding complete! 10 lessons with French cultural contexts ready.")
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
