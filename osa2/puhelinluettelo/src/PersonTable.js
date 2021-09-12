import React from "react";
import Person from "./Person";

const PersonTable = ({ persons, filter, deleteHandler }) => {
  //const { persons, filter } = this.props;
  console.log(filter);

  return (
    <table>
      <tbody>
        {persons.map((person) => {
          if (filter) {
            let filterRegex = new RegExp(filter, "i");
            if (filterRegex.test(person.name)) {
              return (
                <Person
                  name={person.name}
                  id={person.id}
                  number={person.number}
                  deleteHandler={deleteHandler}
                />
              );
            }
            return null;
          }
          return (
            <Person
              name={person.name}
              id={person.id}
              number={person.number}
              deleteHandler={deleteHandler}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default PersonTable;
