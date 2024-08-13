const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const personSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number },
  favoriteFoods: { type: [String], default: [] }  
});


const Person = mongoose.model('Person', personSchema);

const person = new Person({
    name: 'Alice',
    age: 30,
    favoriteFoods: ['Pizza', 'Pasta']
  });
  
  person.save(function(err, data) {
    if (err) {
      console.error(err);
    } else {
      console.log('Person saved:', data);
    }
  });
  
  const arrayOfPeople = [
    { name: 'Bob', age: 25, favoriteFoods: ['Burger', 'Fries'] },
    { name: 'Carol', age: 29, favoriteFoods: ['Sushi', 'Ramen'] },
    { name: 'Dave', age: 35, favoriteFoods: ['Steak', 'Potatoes'] }
  ];
  
  Person.create(arrayOfPeople, function(err, data) {
    if (err) {
      console.error(err);
    } else {
      console.log('People created:', data);
    }
  });
  

  Person.find({ name: 'Alice' }, function(err, people) {
    if (err) {
      console.error(err);
    } else {
      console.log('People found:', people);
    }
  });

  
  function findPersonByFavoriteFood(food, callback) {
    Person.findOne({ favoriteFoods: food }, function(err, person) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, person);
      }
    });
  }
  
  findPersonByFavoriteFood('Pizza', function(err, person) {
    if (err) {
      console.error(err);
    } else {
      console.log('Person found:', person);
    }
  });

  
  function findPersonById(personId, callback) {
    Person.findById(personId, function(err, person) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, person);
      }
    });
  }
  
 
  findPersonById('60b8d295d5f507001c8d8f65', function(err, person) {
    if (err) {
      console.error(err);
    } else {
      console.log('Person found:', person);
    }
  });

  
  const personId = '60b8d295d5f507001c8d8f65';

  Person.findById(personId, function(err, person) {
    if (err) {
      console.error(err);
    } else {
      person.favoriteFoods.push('hamburger');
      person.markModified('favoriteFoods');
      person.save(function(err, updatedPerson) {
        if (err) {
          console.error(err);
        } else {
          console.log('Person updated:', updatedPerson);
        }
      });
    }
  });

  
  function updatePersonAgeByName(personName, callback) {
    Person.findOneAndUpdate(
      { name: personName },
      { age: 20 },
      { new: true },
      function(err, updatedPerson) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, updatedPerson);
        }
      }
    );
  }
  
  updatePersonAgeByName('Alice', function(err, person) {
    if (err) {
      console.error(err);
    } else {
      console.log('Person updated:', person);
    }
  });

  
  function deletePersonById(personId, callback) {
    Person.findByIdAndRemove(personId, function(err, removedPerson) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, removedPerson);
      }
    });
  }
  
  // Example usage
  deletePersonById('60b8d295d5f507001c8d8f65', function(err, person) {
    if (err) {
      console.error(err);
    } else {
      console.log('Person deleted:', person);
    }
  });

  
  Person.remove({ name: 'Mary' }, function(err, result) {
    if (err) {
      console.error(err);
    } else {
      console.log('Result of delete operation:', result);
    }
  });

  
  Person.find({ favoriteFoods: 'burritos' })
  .sort({ name: 1 })
  .limit(2)
  .select('-age')
  .exec(function(err, people) {
    if (err) {
      console.error(err);
    } else {
      console.log('People found:', people);
    }
  });


  