"use client";

export const useEvent = () => {
  // Función para abrir el mapa en Google Maps
  const handleOpenMap = () => {
    window.open(
      "https://www.google.com/maps/place/Maloka+Museo+Interactivo/@4.6553526,-74.1120368,17z/data=!3m1!4b1!4m6!3m5!1s0x8e3f9b9054993fbd:0x938e1d73ccde6192!8m2!3d4.6553526!4d-74.1120368!16s%2Fm%2F0bmj06q",
      "_blank"
    );
  };

  const eventData = {
    title: "Sobre el Evento",
    description:
      "El Congreso Magno 3.0 es el evento más importante del año para profesionales y empresas que buscan innovar y crecer en el mercado actual.",
    subtitle: "Un evento diseñado para profesionales",
    mainText:
      "El Congreso Magno 3.0 reúne a los mejores profesionales del sector odontológico para compartir conocimientos, experiencias y las últimas tendencias en tecnología y procedimientos.",
    features: [
      {
        title: "Conferencias",
        description: "Ponencias de expertos nacionales e internacionales",
      },
      {
        title: "Workshops",
        description: "Talleres prácticos con las últimas técnicas",
      },
      {
        title: "Networking",
        description: "Oportunidades para conectar con colegas",
      },
      {
        title: "Exposición",
        description: "Muestra de productos y servicios innovadores",
      },
    ],
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.6556476949972!2d-74.11203682502094!3d4.655352595319509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9b9054993fbd%3A0x938e1d73ccde6192!2sMaloka%20Museo%20Interactivo!5e0!3m2!1ses!2sco!4v1742437306937!5m2!1ses!2sco",
  };

  return {
    handleOpenMap,
    eventData,
  };
};
