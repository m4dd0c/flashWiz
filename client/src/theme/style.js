// you can change these colors to change the look of the app ;)
export const styles = {
  reg: { fontFamily: "montReg" },
  title: {
    fontFamily: "montXbold",
    fontSize: 45,
    paddingLeft: 4,
    textTransform: "uppercase",
    color: "#666666",
  },
  thick: {
    fontFamily: "montBold",
    color: "#242424",
  },
  btn: {
    textAlign: "center",
    fontFamily: "montBold",
  },

  //table
  container: { padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 45, backgroundColor: "#f1f8ff" },
  row: { flexDirection: "row" },
  text: {
    margin: 10,
    textAlign: "center",
    fontFamily: "montReg",
  },
  headText: {
    margin: 10,
    textAlign: "center",
    fontFamily: "montBold",
  },
};

const gradients = [
  {
    a: "#ffcb52",
    b: "#ff7b02",
  },
  {
    a: "#c165dd",
    b: "#5c27fe",
  },
  {
    a: "#2afeb7",
    b: "#08c792",
  },
  {
    a: "#5581f1",
    b: "#1153fc",
  },
  {
    a: "#facd68",
    b: "#fc76b3",
  },
  {
    a: "#00f7a7",
    b: "#04f5ed",
  },
  {
    a: "#1de5e2",
    b: "#b588f7",
  },
  {
    a: "#ffe324",
    b: "#ffb533",
  },
];

export const getGradient = () => {
  const randInt = Math.trunc(Math.random() * gradients.length - 1);
  return gradients[randInt];
};
