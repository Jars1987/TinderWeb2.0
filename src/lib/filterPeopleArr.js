const filterPeopleArr = (pepleArr, gender, ageRange) => {
  const newArr = [...pepleArr];

  let filteredArr;
  console.log(newArr);
  if (gender !== 'both') {
    filteredArr = newArr.filter(people => {
      return (
        people.gender === gender &&
        parseInt(people.age) >= ageRange[0] &&
        parseInt(people.age) <= ageRange[1]
      );
    });
  }

  if (gender === 'both') {
    filteredArr = newArr.filter(people => {
      return (
        parseInt(people.age) >= ageRange[0] &&
        parseInt(people.age) <= ageRange[1]
      );
    });
  }

  return filteredArr;
};

export default filterPeopleArr;
