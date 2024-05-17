import { Admin } from "typeorm";
import { v4 as uuidv4 } from "uuid";

/**
 * give a random date between two date
 * @param start date
 * @param end date
 * @returns a random date
 */
function randomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

/**
 * return a random number between two values
 * @param min
 * @param max
 * @returns
 */
function getRandomArbitrary(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

export const DummyUsers: {
  email: string;
  password: string;
  lastname: string;
  firstname: string;
  avatar: any;
  created_at: Date;
  is_account_validated: boolean;
}[] = [
  {
    email: "user1@gmail.com",
    password: "superPassword",
    lastname: "Jean",
    firstname: "Jacques",
    avatar: { id: 1 },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
    is_account_validated: true,
  },
  {
    email: "user2@gmail.com",
    password: "superPassword2",
    lastname: "Thomas",
    firstname: "Brac",
    avatar: { id: 2 },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
    is_account_validated: true,
  },
  {
    email: "user3@gmail.com",
    password: "superPassword3",
    lastname: "Léa",
    firstname: "Soto",
    avatar: { id: 3 },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
    is_account_validated: true,
  },
  {
    email: "user4@gmail.com",
    password: "superPassword4",
    lastname: "June",
    firstname: "Jin",
    avatar: { id: 4 },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
    is_account_validated: true,
  },
];

export const DummyTags: {
  name: any;
  created_by_user: any;
  created_at: Date;
}[] = [
  {
    name: "Technologie",
    created_by_user: { id: 5 },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Art",
    created_by_user: null,
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Musique",
    created_by_user: null,
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Sport",
    created_by_user: null,
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Voyage",
    created_by_user: null,
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Cuisine",
    created_by_user: null,
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Photographie",
    created_by_user: null,
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Mode",
    created_by_user: null,
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Science",
    created_by_user: null,
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Santé",
    created_by_user: null,
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Éducation",
    created_by_user: null,
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Finance",
    created_by_user: null,
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Nature",
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Culture",
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Divertissement",
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Histoire",
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Politique",
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Religion",
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Langues",
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Développement personnel",
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
];

export const DummyRessources: {
  title: string;
  description: string;
  is_favorite: boolean;
  image_id: any;
  file_id: any;
  link_id: any;
  group_id: any;
  created_by_user: any;
  created_at: Date;
}[] = [
  {
    title: "Guide ultime pour devenir un développeur Full Stack",
    description:
      "Découvrez les étapes essentielles pour devenir un développeur Full Stack compétent.",
    is_favorite: false,
    image_id: null,
    file_id: { id: 1 },
    link_id: null,
    group_id: { id: getRandomArbitrary(1, 5) },
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    title: "Les secrets de la productivité au travail",
    description:
      "Apprenez des stratégies et des astuces pour être plus productif dans votre vie professionnelle.",
    is_favorite: true,
    image_id: null,
    file_id: { id: 2 },
    link_id: null,
    group_id: { id: getRandomArbitrary(1, 5) },
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    title: "Art culinaire : recettes innovantes du monde entier",
    description:
      "Explorez une sélection de recettes uniques et délicieuses provenant de différentes cultures.",
    is_favorite: false,
    image_id: null,
    file_id: { id: 3 },
    link_id: null,
    group_id: { id: getRandomArbitrary(1, 5) },
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    title: "Guide pratique pour voyager en solo",
    description:
      "Découvrez les meilleures pratiques pour voyager en solo en toute sécurité et en toute confiance.",
    is_favorite: false,
    image_id: null,
    file_id: { id: 4 },
    link_id: null,
    group_id: { id: getRandomArbitrary(1, 5) },
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    title: "La science derrière le sommeil réparateur",
    description:
      "Découvrez les mécanismes biologiques du sommeil et des conseils pour améliorer la qualité de votre sommeil.",
    is_favorite: false,
    image_id: null,
    file_id: { id: 5 },
    link_id: null,
    group_id: { id: getRandomArbitrary(1, 5) },
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    title: "Techniques avancées de méditation pour la concentration",
    description:
      "Maîtrisez des techniques de méditation avancées pour améliorer votre concentration et votre bien-être mental.",
    is_favorite: true,
    image_id: { id: 6 },
    file_id: null,
    link_id: { id: 1 },
    group_id: { id: getRandomArbitrary(1, 5) },
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    title: "Guide pour devenir un expert en photographie",
    description:
      "Apprenez les techniques et les secrets pour capturer des photos magnifiques comme un professionnel.",
    is_favorite: false,
    image_id: { id: 7 },
    file_id: null,
    link_id: { id: 2 },
    group_id: { id: getRandomArbitrary(1, 5) },
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    title: "Les bases de la gestion financière personnelle",
    description:
      "Acquérez les connaissances nécessaires pour gérer efficacement vos finances personnelles et atteindre vos objectifs financiers.",
    is_favorite: false,
    image_id: { id: 8 },
    file_id: null,
    link_id: { id: 3 },
    group_id: { id: getRandomArbitrary(1, 5) },
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    title: "Stratégies de marketing numérique pour les petites entreprises",
    description:
      "Découvrez des stratégies efficaces de marketing numérique pour promouvoir votre petite entreprise en ligne.",
    is_favorite: false,
    image_id: { id: 9 },
    file_id: null,
    link_id: { id: 4 },
    group_id: { id: getRandomArbitrary(1, 5) },
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    title: "Les secrets de la réussite dans le monde de l'entrepreneuriat",
    description:
      "Explorez les habitudes et les principes clés qui conduisent au succès dans le monde de l'entrepreneuriat.",
    is_favorite: true,
    image_id: { id: 10 },
    file_id: null,
    link_id: { id: 5 },
    group_id: { id: getRandomArbitrary(1, 5) },
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
];

export const DummyLinks: {
  url: string;
  created_by_user: any;
  created_at: Date;
}[] = [
  {
    url: "https://openai.com/blog/",
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    url: "https://github.com/",
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    url: "https://developer.mozilla.org/",
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    url: "https://stackoverflow.com/",
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    url: "https://medium.com/",
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
];

export const DummyFiles: {
  name: string;
  type: string;
  path: string;
  created_by_user: any;
  created_at: Date;
}[] = [
  {
    name: "Document de projet",
    type: "PDF",
    path: "/documents/projet.pdf",
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Présentation finale",
    type: "PowerPoint",
    path: "/documents/final.pptx",
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Feuille de calcul budgétaire",
    type: "Excel",
    path: "/documents/budget.xlsx",
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Fichier source",
    type: "Code",
    path: "/documents/source_code.zip",
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Image de logo",
    type: "Image",
    path: "/documents/logo.png",
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
];

export const DummyImages: {
  name: string;
  path: string;
  created_by_user: any;
  created_at: Date;
}[] = [
  {
    name: "Paysage montagneux",
    path: "https://images.unsplash.com/photo-1710330506776-fd13cb805ae0?q=80&w=1210&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Coucher de soleil sur l'océan",
    path: "https://images.unsplash.com/photo-1676775354056-5ad8ec7d71fa?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Forêt enchantée",
    path: "https://images.unsplash.com/photo-1619982870053-1545857b7eb4?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Léa",
    path: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D",
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "June",
    path: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww",
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Jean",
    path: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww",
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Thomas",
    path: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D",
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Chemin forestier",
    path: "https://images.unsplash.com/photo-1601570634862-483703ee8f6d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q2hlbWluJTIwZm9yZXN0aWVyfGVufDB8fDB8fHww",
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Vue aérienne de la campagne",
    path: "https://images.unsplash.com/photo-1584837443681-2e908daf1450?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8VnVlJTIwYSVDMyVBOXJpZW5uZSUyMGRlJTIwbGElMjBjYW1wYWduZXxlbnwwfHwwfHx8MA%3D%3D",
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Arbres en automne",
    path: "https://images.unsplash.com/photo-1667031750790-110d3c16c2ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fEFyYnJlcyUyMGVuJTIwYXV0b21uZXxlbnwwfHwwfHx8MA%3D%3D",
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
];

export const DummyGroups: {
  name: string;
  description: string;
  token: string;
  created_by_user: any;
  created_at: Date;
}[] = [
  {
    name: "Groupe 1",
    description: "Description du groupe 1",
    token: uuidv4(),
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Groupe 2",
    description: "Description du groupe 2",
    token: uuidv4(),
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Groupe 3",
    description: "Description du groupe 3",
    token: uuidv4(),
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Groupe 4",
    description: "Description du groupe 4",
    token: uuidv4(),
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Groupe 5",
    description: "Description du groupe 5",
    token: uuidv4(),
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
];

export const DummyRights: {
  name: string;
}[] = [
  {
    name: "GROUP_ADMIN",
  },
  {
    name: "USER",
  },
  {
    name: "ADMIN",
  },
];

export const DummyMessages: {
  message: string;
  group_id: any;
  created_by_user: any;
  created_at: Date;
}[] = [
  {
    message: "Bonjour, comment ça va ?",
    group_id: { id: getRandomArbitrary(1, 6) },
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    message: "As-tu passé une bonne journée ?",
    group_id: { id: getRandomArbitrary(1, 6) },
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    message: "Quels sont tes projets pour ce week-end ?",
    group_id: { id: getRandomArbitrary(1, 6) },
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    message: "Merci beaucoup pour ton aide !",
    group_id: { id: getRandomArbitrary(1, 6) },
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    message: "Je suis vraiment désolé, j'ai oublié de t'envoyer le rapport.",
    group_id: { id: getRandomArbitrary(1, 6) },
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    message: "J'ai hâte de voir le résultat final de notre projet.",
    group_id: { id: getRandomArbitrary(1, 6) },
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    message: "N'oublie pas la réunion demain matin à 9 heures.",
    group_id: { id: getRandomArbitrary(1, 6) },
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    message: "Est-ce que tu pourrais me donner ton avis sur ce document ?",
    group_id: { id: getRandomArbitrary(1, 6) },
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    message: "Bonne journée !",
    group_id: { id: getRandomArbitrary(1, 6) },
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    message:
      "Je suis en train de travailler sur un nouveau projet passionnant.",
    group_id: { id: getRandomArbitrary(1, 6) },
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    message: "Nous devrions organiser une sortie d'équipe bientôt.",
    group_id: { id: getRandomArbitrary(1, 6) },
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    message: "Je te souhaite un bon anniversaire !",
    group_id: { id: getRandomArbitrary(1, 6) },
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    message:
      "Pourrais-tu me donner une mise à jour sur l'avancement du projet ?",
    group_id: { id: getRandomArbitrary(1, 6) },
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    message: "Je suis vraiment content de travailler avec toi.",
    group_id: { id: getRandomArbitrary(1, 6) },
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    message:
      "N'oublie pas de prendre une pause de temps en temps pour te reposer.",
    group_id: { id: getRandomArbitrary(1, 6) },
    created_by_user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
];

export const DummyMembers: {
  group_id: any;
  last_visit: Date;
  user: any;
  created_at: Date;
}[] = [
  {
    group_id: { id: getRandomArbitrary(1, 6) },
    last_visit: randomDate(new Date(2012, 0, 1), new Date()),
    user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    group_id: { id: getRandomArbitrary(1, 6) },
    last_visit: randomDate(new Date(2012, 0, 1), new Date()),
    user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    group_id: { id: getRandomArbitrary(1, 6) },
    last_visit: randomDate(new Date(2012, 0, 1), new Date()),
    user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    group_id: { id: getRandomArbitrary(1, 6) },
    last_visit: randomDate(new Date(2012, 0, 1), new Date()),
    user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    group_id: { id: getRandomArbitrary(1, 6) },
    last_visit: randomDate(new Date(2012, 0, 1), new Date()),
    user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    group_id: { id: getRandomArbitrary(1, 6) },
    last_visit: randomDate(new Date(2012, 0, 1), new Date()),
    user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    group_id: { id: getRandomArbitrary(1, 6) },
    last_visit: randomDate(new Date(2012, 0, 1), new Date()),
    user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    group_id: { id: getRandomArbitrary(1, 6) },
    last_visit: randomDate(new Date(2012, 0, 1), new Date()),
    user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    group_id: { id: getRandomArbitrary(1, 6) },
    last_visit: randomDate(new Date(2012, 0, 1), new Date()),
    user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    group_id: { id: getRandomArbitrary(1, 6) },
    last_visit: randomDate(new Date(2012, 0, 1), new Date()),
    user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    group_id: { id: getRandomArbitrary(1, 6) },
    last_visit: randomDate(new Date(2012, 0, 1), new Date()),
    user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    group_id: { id: getRandomArbitrary(1, 6) },
    last_visit: randomDate(new Date(2012, 0, 1), new Date()),
    user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    group_id: { id: getRandomArbitrary(1, 6) },
    last_visit: randomDate(new Date(2012, 0, 1), new Date()),
    user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    group_id: { id: getRandomArbitrary(1, 6) },
    last_visit: randomDate(new Date(2012, 0, 1), new Date()),
    user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    group_id: { id: getRandomArbitrary(1, 6) },
    last_visit: randomDate(new Date(2012, 0, 1), new Date()),
    user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    group_id: { id: getRandomArbitrary(1, 6) },
    last_visit: randomDate(new Date(2012, 0, 1), new Date()),
    user: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
];
