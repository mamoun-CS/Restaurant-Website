

const notes = [
  {
    key: 1,
    title: "Double Cheese Burger",
    img: "./img/1.png",
    priceOne: 31,
    priceTwo: 26,
    priceThree: null,
    content: "Delicious double cheese burger with fresh ingredients."
  },
  {
    key: 2,
    title: "Chili Burger",
    img: "./img/2.png",
    priceOne: 33,
    priceTwo: 28,
    priceThree: null,
    content: "Spicy chili burger with jalapeños and cheddar cheese."
  },
  {
    key: 3,
    title: "Mushroom White Burger",
    img: "./img/3.png",
    priceOne: 34,
    priceTwo: 29,
    priceThree: null,
    content: "Juicy beef patty with creamy mushroom sauce."
  },
  {
    key: 4,
    title: "Mushroom Swiss Burger",
    img: "./img/4.png",
    priceOne: 34,
    priceTwo: 29,
    priceThree: null,
    content: "Mushroom Swiss burger with melted cheese."
  },
  {
    key: 5,
    title: "Favorite Mistake",
    img: "./img/5.png",
    priceOne: 31,
    priceTwo: 26,
    priceThree: null,
    content: "Crispy burger with a unique blend of flavors."
  },
  {
    key: 6,
    title: "Bacon and Egg",
    img: "./img/6.png",
    priceOne: 33,
    priceTwo: 28,
    priceThree: null,
    content: "Classic burger with bacon and fried egg."
  },
  {
    key: 7,
    title: "Animal Style",
    img: "./img/7.png",
    priceOne: 30,
    priceTwo: 25,
    priceThree: null,
    content: "Incredible burger with a signature sauce."
  },
  {
    key: 8,
    title: "Heavy Duty",
    img: "./img/8.png",
    priceOne: 49,
    priceTwo: 44,
    priceThree: null,
    content: "Loaded beef burger with extra cheese and toppings."
  },
  {
    key: 9,
    title: "Mix Burger",
    img: "./img/9.png",
    priceOne: 40,
    priceTwo: 35,
    priceThree: null,
    content: "Perfect combination of crispy and grilled meat."
  },{
    key: 10,
    title: "Kamikaze Burger",
    img: "./img/10.png",
    priceOne: 40,
    priceTwo: 35,
    priceThree: 0,
    content: "Explosive flavors in a single burger."
  },
  {
    key: 11,
    title: "Mac & Cheese Burger",
    img: "/img/12.png",
    priceOne: 40,
    priceTwo: 35,
    priceThree: 0,
    content: "A juicy burger topped with creamy mac & cheese."
  },
  {
    key: 12,
    title: "Cordon Bleu Burger",
    img: "/img/11.png",
    priceOne: 42,
    priceTwo: 37,
    priceThree: 0,
    content: "Breaded chicken cutlet with Swiss cheese and ham."
  },  {
    key: 13,
    title: "Street Burger",
    img: "/img/14.png",
    priceOne: 26,
    priceTwo: 21,
    priceThree: null,
    content: "A simple yet delicious burger with fresh veggies and cheese."
  },
  {
    key: 14,
    title: "Heart Attack",
    img: "/img/13.png",
    priceOne: 28,
    priceTwo: 23,
    priceThree: null,
    content: "A massive burger loaded with toppings and cheese."
  },
  {
    key: 15,
    title: "Mama Burger",
    img: "/img/16.png",
    priceOne: 20,
    priceTwo: 15,
    priceThree: null,
    content: "A kids-friendly burger packed with fresh ingredients."
  },
  {
    key: 16,
    title: "Royal Burger",
    img: "/img/15.png",
    priceOne: 35,
    priceTwo: 30,
    priceThree: null,
    content: "A premium burger with two beef patties and cheddar cheese."
  },
  {
    key: 17,
    title: "Extra Cuban Burger",
    img: "/img/18.png",
    priceOne: 38,
    priceTwo: 33,
    priceThree: null,
    content: "A Cuban-inspired burger with a tangy sauce."
  },
  {
    key: 18,
    title: "Mix Cheese Burger",
    img: "/img/17.png",
    priceOne: 34,
    priceTwo: 29,
    priceThree: null,
    content: "A double-layered cheesy delight with grilled beef."
  },
  {
    key: 19,
    title: "Gym Burger",
    img: "/img/20.png",
    priceOne: 45,
    priceTwo: 40,
    priceThree: null,
    content: "A protein-packed burger for fitness lovers."
  },
  {
    key: 20,
    title: "Aspirin Burger",
    img: "/img/19.png",
    priceOne: 45,
    priceTwo: 40,
    priceThree: null,
    content: "A hearty burger with a unique oat-bun texture."
  },
  {
    key: 21,
    title: "Pesto Chicken",
    img: "./img/26.png",
    priceOne: 29,
    priceTwo: 24,
    priceThree: null,
    content: "Crispy fried chicken with pesto sauce, cheddar cheese, and fresh veggies."
  },
  {
    key: 22,
    title: "Chicken Heaven",
    img: "./img/27.png",
    priceOne: 29,
    priceTwo: 24,
    priceThree: null,
    content: "Grilled chicken breast with cheddar cheese, fresh tomatoes, and special sauce."
  },
  {
    key: 23,
    title: "Chicken Crispy",
    img: "./img/28.png",
    priceOne: 25,
    priceTwo: 20,
    priceThree: null,
    content: "Crispy fried chicken with melted cheddar cheese and fresh vegetables."
  },
  {
    key: 24,
    title: "Crown Burger",
    img: "./img/29.png",
    priceOne: 33,
    priceTwo: 28,
    priceThree: null,
    content: "Crispy fried chicken with salami, cheddar cheese, and fresh lettuce."
  },
  {
    key: 25,
    title: "Boneless Heart Attack",
    img: "./img/30.png",
    priceOne: 28,
    priceTwo: null,
    priceThree: null,
    content: "11 pieces of spicy boneless chicken served in a signature sauce."
  },
  {
    key: 26,
    title: "Jeej Burger",
    img: "./img/21.png",
    priceOne: 45,
    priceTwo: 40,
    priceThree: null,
    content: "Double mini burgers with bacon and melted cheese, served in a bowl."
  },
  {
    key: 27,
    title: "Buffalo Crispy",
    img: "./img/22.png",
    priceOne: 35,
    priceTwo: 30,
    priceThree: null,
    content: "Buffalo crispy chicken with melted cheese and lettuce."
  },
  {
    key: 28,
    title: "Chicken Lava",
    img: "./img/23.png",
    priceOne: 38,
    priceTwo: 33,
    priceThree: null,
    content: "Spicy chicken burger with lava-style sauce and melted cheese."
  },
  {
    key: 29,
    title: "Wagyu Burger",
    img: "./img/24.png",
    priceOne: 95,
    priceTwo: 90,
    priceThree: null,
    content: "Premium Wagyu beef burger with cheddar cheese and fresh vegetables."
  },
  {
    key: 30,
    title: "Casanova Burger",
    img: "./img/25.png",
    priceOne: 42,
    priceTwo: 37,
    priceThree: null,
    content: "Cheese-filled beef burger with a rich, creamy texture."
  },
  {
    key: 31,
    title: "Boneless Heart Attack",
    img: "/img/31.png",
    priceOne: 28,
    priceTwo: null,
    priceThree: null,
    content: "11 pieces of boneless chicken with your choice of sauce."
  },
  {
    key: 32,
    title: "Buffalo Sauce Boneless",
    img: "/img/31.png",
    priceOne: 5,
    priceTwo: null,
    priceThree: null,
    content: "Boneless chicken coated in spicy buffalo sauce."
  },
  {
    key: 33,
    title: "Chicken Fries",
    img: "/img/32.png",
    priceOne: 30,
    priceTwo: 100,
    priceThree: null,
    content: "Crispy chicken fries available in different portion sizes."
  },{
    key: 34,
    title: "Mac and Cheese",
    img: "/img/330.png",
    priceOne: 35,
    priceTwo: null,
    priceThree: null,
    content: "Creamy mac and cheese topped with crispy chicken."
  },
  {
    key: 35,
    title: "Caesar Salad",
    img: "/img/344.png",
    priceOne: 25,
    priceTwo: null,
    priceThree: null,
    content: "Classic Caesar salad with grilled chicken and dressing."
  },
  {
    key: 36,
    title: "Coleslaw Salad",
    img: "/img/355.png",
    priceOne: 5,
    priceTwo: 10,
    priceThree: null,
    content: "Fresh coleslaw salad with creamy dressing."
  },
  {
    key: 37,
    title: "Honey Syringe",
    img: "/img/38.png",
    priceOne: 10,
    priceTwo: null,
    priceThree: null,
    content: "A syringe filled with honey, perfect for adding a sweet touch."
  },
  {
    key: 38,
    title: "Honey Pot",
    img: "/img/39.png",
    priceOne: 7,
    priceTwo: 5,
    priceThree: null,
    content: "A bowl of honey with a wooden dipper."
  },
  {
    key: 39,
    title: "Nachos",
    img: "/img/40.png",
    priceOne: 5,
    priceTwo: null,
    priceThree: null,
    content: "Crunchy nachos served as a side."
  },
  {
    key: 40,
    title: "Tender Chicken",
    img: "/img/35.png",
    priceOne: 25,
    priceTwo: 6,
    priceThree: null,
    content: "Crispy fried chicken tenders, available in multiple sizes."
  },
  {
    key: 41,
    title: "Jalapeno",
    img: "/img/41.png",
    priceOne: 5,
    priceTwo: 2,
    priceThree: null,
    content: ""
  },
  {
    key: 42,
    title: "Curly Fries",
    img: "/img/42.png",
    priceOne: 21,
    priceTwo: 16,
    priceThree: 10,
    content: ""
  },
  {
    key: 43,
    title: "French Fries",
    img: "/img/43.png",
    priceOne: 15,
    priceTwo: 9,
    priceThree: 6,
    content: ""
  },
  {
    key: 44,
    title: "Potato Wedges",
    img: "/img/44.png",
    priceOne: 20,
    priceTwo: 12,
    priceThree: 9,
    content: ""
  },
  {
    key: 45,
    title: "Crispy Fries",
    img: "/img/45.png",
    priceOne: 21,
    priceTwo: 16,
    priceThree: 10,
    content: ""
  },
  {
    key: 46,
    title: "Steak Fries",
    img: "/img/46.png",
    priceOne: 16,
    priceTwo: 10,
    priceThree: 7,
    content: "Crispy fried chicken tenders, available in multiple sizes."
  },
  {
    key: 47,
    title: "Cheese Syringe",
    img: "/img/48.png",
    priceOne: 8,
    priceTwo: null,
    priceThree: null,
    content: ""
  }
];


export const addNote = (newNote) => {
  newNote.key = notes.length + 1; // Auto-increment key
  notes.push(newNote);
};
export default notes;


