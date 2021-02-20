export default function transformPhoneNumber(str) {
  let phoneArr = str.split("");
  let newArr = phoneArr.map((elem, i) => {
    if (i !== 0 && i % 2 === 0) {
      return (elem = "." + elem);
    } else return elem;
  });
  return newArr;
}
