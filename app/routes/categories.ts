export interface Item {
  name: string;
  price: number;
  description?: string;
}

export const categories = {
  food: {
    name: "Food",
    items: [
      { name: "Big Mac", price: 5.99 },
      { name: "Chipotle Burrito", price: 8.99 }
    ]
  },
  tech: {
    name: "Tech",
    items: [
      { name: "iPhone 15 Pro", price: 999 },
      { name: "MacBook Pro", price: 1999 }
    ]
  },
  education: {
    name: "Education",
    items: [
      { name: "College Tuition (1 Year)", price: 35000 }
    ]
  },
  cars: {
    name: "Cars",
    items: [
      { name: "Honda Civic", price: 25000 },
      { name: "Tesla Model 3", price: 40000 }
    ]
  }
};

export type Category = keyof typeof categories;