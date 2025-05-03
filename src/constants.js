const GRAD_PACKAGE_INFO = new Map([
    ["solo1", {
      id: "solo1",
      title: "Solos (1.5 hour)",
      numClients: "1 person",
      description: "50-70 edited photos, hand-selected by you. Professional poses and my full, undivided attention!",
      duration: "5:30PM-7PM",
      price: "$120"
    }],
    ["solo2", {
      id: "solo2",
      title: "Solos (2 hour)",
      numClients: "1 person",
      description: "60-80 edited photos, hand-selected by you. Professional poses and my full, undivided attention!",
      duration: "5PM-7PM",
      price: "$140"
    }],
    ["duos", {
      id: "duos",
      title: "Duos",
      numClients: "2 people",
      description: "60-80 edited photos, hand-selected by you. Buddy photos and solo photos!",
      duration: "5PM-7PM",
      price: "$230"
    }],
    ["triplets", {
      id: "triplets",
      title: "Triplets",
      numClients: "3 people",
      description: "65-85 edited photos. Group photos and solo photos!",
      duration: "5PM-7PM",
      price: "$330"
    }],
    ["quads", {
      id: "quads",
      title: "Quads",
      numClients: "4 people",
      description: "70-90 edited photos. Group photos and solo photos!",
      duration: "5PM-7PM",
      price: "$420"
    }],
    ["fivePlus", {
      id: "fivePlus",
      title: "Five Plus",
      numClients: "5+ people (+$95 per each additional person)",
      description: "75-100 edited photos. Emphasis on group photos with a few solos!",
      duration: "5PM-7PM",
      price: "$475+"
    }]
  ])


const PHOTO_LOCATION_DATA = {
  "UC Irvine" : {
    "MSTB Archways" : "./resources/joshjumping-scale-down.jpg",
    "Aldrich Park (flowers, trees, grass fields, ring road)" : "./resources/michael-portrait-scale-down.jpg",
    "Buildings from your college (ex. Business school for Business Majors, Arts school for Arts majors, etc.)" : "",
    "Infinity Fountain" : "",
    "University of California sign" : "",
    "Student Center (terrace, Peter statues)" : "",
    "Bren Events Center (Peter statue, water tower)" : "",
    "Langson Library / Gateway" : "",
  },
  "UCLA" : {
    "Location 1" : "./resources/joshjumping-scale-down.jpg",
    "Location 2" : "./resources/michael-portrait-scale-down.jpg",
  },
  "UCSD" : {
    "Beach Bridge" : "./resources/michael-portrait-scale-down.jpg",
    "Library" : "./resources/joshjumping-scale-down.jpg", 
  },
  "Cal Poly Pomona" : {
    "Japanese Garden" : "",
    "Gazebo Flower Garden" : ""
  },
  "UC Riverside" : {
    "Clock Tower" : "",
    "Hallway" : "",
    "UCR Letters" : ""
  }
};

export {GRAD_PACKAGE_INFO, PHOTO_LOCATION_DATA};