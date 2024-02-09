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

function getRandomArbitrary(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

export const DummyUsers: {
  email: string;
  password: string;
  lastname: string;
  firstname: string;
  image_id: any;
  created_at: Date;
}[] = [
  {
    email: "user1@gmail.com",
    password: "superPassword",
    lastname: "Jean",
    firstname: "Jacques",
    image_id: { id: 1 },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    email: "user2@gmail.com",
    password: "superPassword2",
    lastname: "Thomas",
    firstname: "Brac",
    image_id: { id: 2 },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    email: "user3@gmail.com",
    password: "superPassword3",
    lastname: "Léa",
    firstname: "Soto",
    image_id: { id: 3 },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    email: "user4@gmail.com",
    password: "superPassword4",
    lastname: "June",
    firstname: "Jin",
    image_id: { id: 4 },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
];

export const DummyTags: { name: any; created_by: any; created_at: Date }[] = [
  {
    name: "Technologie",
    created_by: { id: 5 },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Art",
    created_by: null,
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Musique",
    created_by: null,
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Sport",
    created_by: null,
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Voyage",
    created_by: null,
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Cuisine",
    created_by: null,
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Photographie",
    created_by: null,
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Mode",
    created_by: null,
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Science",
    created_by: null,
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Santé",
    created_by: null,
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Éducation",
    created_by: null,
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Finance",
    created_by: null,
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Nature",
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Culture",
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Divertissement",
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Histoire",
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Politique",
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Religion",
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Langues",
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Développement personnel",
    created_by: { id: getRandomArbitrary(1, 5) },
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
  created_by: any;
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
    created_by: { id: getRandomArbitrary(1, 5) },
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
    created_by: { id: getRandomArbitrary(1, 5) },
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
    created_by: { id: getRandomArbitrary(1, 5) },
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
    created_by: { id: getRandomArbitrary(1, 5) },
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
    created_by: { id: getRandomArbitrary(1, 5) },
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
    created_by: { id: getRandomArbitrary(1, 5) },
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
    created_by: { id: getRandomArbitrary(1, 5) },
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
    created_by: { id: getRandomArbitrary(1, 5) },
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
    created_by: { id: getRandomArbitrary(1, 5) },
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
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
];

export const DummyLinks: {
  title: string;
  url: string;
  created_by: any;
  created_at: Date;
}[] = [
  {
    title: "OpenAI Blog",
    url: "https://openai.com/blog/",
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    title: "GitHub Repository",
    url: "https://github.com/",
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    title: "Mozilla Developer Network",
    url: "https://developer.mozilla.org/",
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    title: "Stack Overflow",
    url: "https://stackoverflow.com/",
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    title: "Medium",
    url: "https://medium.com/",
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
];

export const DummyFiles: {
  name: string;
  type: string;
  path: string;
  created_by: any;
  created_at: Date;
}[] = [
  {
    name: "Document de projet",
    type: "PDF",
    path: "/documents/projet.pdf",
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Présentation finale",
    type: "PowerPoint",
    path: "/documents/final.pptx",
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Feuille de calcul budgétaire",
    type: "Excel",
    path: "/documents/budget.xlsx",
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Fichier source",
    type: "Code",
    path: "/documents/source_code.zip",
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Image de logo",
    type: "Image",
    path: "/documents/logo.png",
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
];

export const DummyImages: {
  name: string;
  path: string;
  created_by: any;
  created_at: Date;
}[] = [
  {
    name: "Paysage montagneux",
    path: "https://pixabay.com/fr/photos/%C3%A9cureuil-animal-nature-rongeur-8536537/",
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Coucher de soleil sur l'océan",
    path: "https://pixabay.com/fr/photos/d%C3%A9fil%C3%A9-montagnes-gorge-nature-8495836/",
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Forêt enchantée",
    path: "https://pixabay.com/fr/photos/roche-plage-c%C3%B4te-mer-oc%C3%A9an-sable-8196075/",
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Léa",
    path: "https://pixabay.com/fr/photos/femme-beaut%C3%A9-fris%C3%A9-cheveu-visage-1439909/",
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "June",
    path: "https://pixabay.com/fr/photos/portrait-femme-profil-visage-dame-657116/",
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Jean",
    path: "https://pixabay.com/fr/photos/barbe-visage-homme-maquette-1845166/",
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Thomas",
    path: "https://pixabay.com/fr/photos/ambassadeur-r%C3%A9seau-pi-gehlert-homme-852766/",
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Chemin forestier",
    path: "https://pixabay.com/fr/photos/%C3%A9tang-r%C3%A9flexion-for%C3%AAt-nature-8384421/",
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Vue aérienne de la campagne",
    path: "https://pixabay.com/fr/photos/des-nuages-ciel-atmosph%C3%A8re-nuageux-8420083/",
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Arbres en automne",
    path: "https://pixabay.com/fr/photos/canard-lac-sauvagine-tombe-nature-8445697/",
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
];

export const DummyGroups: {
  name: string;
  description: string;
  token: string;
  created_by: any;
  created_at: Date;
}[] = [
  {
    name: "Groupe 1",
    description: "Description du groupe 1",
    token: uuidv4(),
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Groupe 2",
    description: "Description du groupe 2",
    token: uuidv4(),
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Groupe 3",
    description: "Description du groupe 3",
    token: uuidv4(),
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Groupe 4",
    description: "Description du groupe 4",
    token: uuidv4(),
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    name: "Groupe 5",
    description: "Description du groupe 5",
    token: uuidv4(),
    created_by: { id: getRandomArbitrary(1, 5) },
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
  created_by: any;
  created_at: Date;
}[] = [
  {
    message: "Bonjour, comment ça va ?",
    group_id: { id: getRandomArbitrary(1, 6) },
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    message: "As-tu passé une bonne journée ?",
    group_id: { id: getRandomArbitrary(1, 6) },
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    message: "Quels sont tes projets pour ce week-end ?",
    group_id: { id: getRandomArbitrary(1, 6) },
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    message: "Merci beaucoup pour ton aide !",
    group_id: { id: getRandomArbitrary(1, 6) },
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    message: "Je suis vraiment désolé, j'ai oublié de t'envoyer le rapport.",
    group_id: { id: getRandomArbitrary(1, 6) },
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    message: "J'ai hâte de voir le résultat final de notre projet.",
    group_id: { id: getRandomArbitrary(1, 6) },
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    message: "N'oublie pas la réunion demain matin à 9 heures.",
    group_id: { id: getRandomArbitrary(1, 6) },
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    message: "Est-ce que tu pourrais me donner ton avis sur ce document ?",
    group_id: { id: getRandomArbitrary(1, 6) },
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    message: "Bonne journée !",
    group_id: { id: getRandomArbitrary(1, 6) },
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    message:
      "Je suis en train de travailler sur un nouveau projet passionnant.",
    group_id: { id: getRandomArbitrary(1, 6) },
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    message: "Nous devrions organiser une sortie d'équipe bientôt.",
    group_id: { id: getRandomArbitrary(1, 6) },
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    message: "Je te souhaite un bon anniversaire !",
    group_id: { id: getRandomArbitrary(1, 6) },
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    message:
      "Pourrais-tu me donner une mise à jour sur l'avancement du projet ?",
    group_id: { id: getRandomArbitrary(1, 6) },
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    message: "Je suis vraiment content de travailler avec toi.",
    group_id: { id: getRandomArbitrary(1, 6) },
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    message:
      "N'oublie pas de prendre une pause de temps en temps pour te reposer.",
    group_id: { id: getRandomArbitrary(1, 6) },
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
];

export const DummyMembers: {
  group_id: any;
  last_visit: Date;
  created_by: any;
  created_at: Date;
}[] = [
  {
    group_id: { id: getRandomArbitrary(1, 6) },
    last_visit: randomDate(new Date(2012, 0, 1), new Date()),
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    group_id: { id: getRandomArbitrary(1, 6) },
    last_visit: randomDate(new Date(2012, 0, 1), new Date()),
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    group_id: { id: getRandomArbitrary(1, 6) },
    last_visit: randomDate(new Date(2012, 0, 1), new Date()),
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    group_id: { id: getRandomArbitrary(1, 6) },
    last_visit: randomDate(new Date(2012, 0, 1), new Date()),
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    group_id: { id: getRandomArbitrary(1, 6) },
    last_visit: randomDate(new Date(2012, 0, 1), new Date()),
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    group_id: { id: getRandomArbitrary(1, 6) },
    last_visit: randomDate(new Date(2012, 0, 1), new Date()),
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    group_id: { id: getRandomArbitrary(1, 6) },
    last_visit: randomDate(new Date(2012, 0, 1), new Date()),
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    group_id: { id: getRandomArbitrary(1, 6) },
    last_visit: randomDate(new Date(2012, 0, 1), new Date()),
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    group_id: { id: getRandomArbitrary(1, 6) },
    last_visit: randomDate(new Date(2012, 0, 1), new Date()),
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    group_id: { id: getRandomArbitrary(1, 6) },
    last_visit: randomDate(new Date(2012, 0, 1), new Date()),
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    group_id: { id: getRandomArbitrary(1, 6) },
    last_visit: randomDate(new Date(2012, 0, 1), new Date()),
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    group_id: { id: getRandomArbitrary(1, 6) },
    last_visit: randomDate(new Date(2012, 0, 1), new Date()),
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    group_id: { id: getRandomArbitrary(1, 6) },
    last_visit: randomDate(new Date(2012, 0, 1), new Date()),
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    group_id: { id: getRandomArbitrary(1, 6) },
    last_visit: randomDate(new Date(2012, 0, 1), new Date()),
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    group_id: { id: getRandomArbitrary(1, 6) },
    last_visit: randomDate(new Date(2012, 0, 1), new Date()),
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
  {
    group_id: { id: getRandomArbitrary(1, 6) },
    last_visit: randomDate(new Date(2012, 0, 1), new Date()),
    created_by: { id: getRandomArbitrary(1, 5) },
    created_at: randomDate(new Date(2012, 0, 1), new Date()),
  },
];
