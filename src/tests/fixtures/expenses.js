import moment from "moment";

export default [
  {
    id: "1",
    description: "Milk",
    note: "",
    amount: 2000,
    createdAt: 0
  },
  {
    id: "2",
    description: "Rent",
    note: "Last months rent",
    amount: 790000,
    createdAt: moment(0)
      .subtract(4, "days")
      .valueOf()
  },
  {
    id: "3",
    description: "New Keys for apartment",
    note: "",
    amount: 5500,
    createdAt: moment(0)
      .add(4, "days")
      .valueOf()
  }
];
