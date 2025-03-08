const logRenderLocation = (componentName) => {
  if (typeof window === "undefined") {
    console.log(`${componentName} rendered on the server`);
  } else {
    console.log(`${componentName} rendered on the client`);
  }
};

export default logRenderLocation;

/* Permet de savoir si un composant est rendu coté client ou server */
/* Exemple d'utilisation : logRenderLocation("Header"); */
