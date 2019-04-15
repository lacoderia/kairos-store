const ordersMock = [
  {
    id: 1,
    number: '701-0271942-1579419',
    status: 'En proceso',
    total: '1564',
    created_at: '2019-04-09T20:00:00.000-05:00',
    volume: 1000,
    products: [
      {
        id: 10,
        name: 'Madhuri Monk Fruit',
        price: 398,
        picture: '/uploads/item/image/16/ayni-madhuri.png',
        quantity: 2,
      },
      {
        id: 21,
        name: 'Ayni Infusión',
        price: 1460,
        picture: '/uploads/item/image/6/ayni-infusion.png',
        quantity: 2,
      },
    ],
    shipping_address: {
      address: "Mango 26, Fracc Floresta",
      city: "Veracruz",
      country: "México",
      id: 176,
      location: "",
      state: "Veracruz",
      zip: "91940",
    },
    payment_method: 'item.payment_method',
  },
  {
    id: 2,
    number: '702-8526791-1549820',
    status: 'Recibido',
    total: '2832',
    created_at: '2019-04-03T20:00:00.000-05:00',
    volume: 2000,
    products: [
      {
        id: 12,
        name: 'Ayni Gotas / 4 unidades',
        price: 1460,
        picture: '/uploads/item/image/14/ayni-gotas.png',
        quantity: 1,
      },
    ],
    shipping_address: {
      address: "Londres 40, col. Juarez",
      city: "CDMX",
      country: "México",
      id: 183,
      location: "",
      state: "CDMX",
      zip: "06600",
    },
    payment_method: 'item.payment_method',
  },
  {
    id: 3,
    number: '701-3229776-7136240',
    status: 'Completado',
    total: '2832',
    created_at: '2019-04-03T20:00:00.000-05:00',
    volume: 500,
    products: [
      {
        id: 10,
        name: 'Madhuri Monk Fruit',
        price: 398,
        picture: '/uploads/item/image/16/ayni-madhuri.png',
        quantity: 2,
      },
      {
        id: 13,
        name: 'Ayni Gotas / 8 unidades',
        price: 2920,
        picture: '/uploads/item/image/14/ayni-gotas.png',
        quantity: 3,
      },
    ],
    shipping_address: {
      address: "El Oro",
      city: "CDMX",
      country: "México",
      id: 185,
      location: "",
      state: "CDMX",
      zip: "06700",
    },
    payment_method: 'item.payment_method',
  }
];

export default ordersMock;
