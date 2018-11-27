import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';


class App extends Component {
  state ={
    persons: [
      {id :'qw', name:'Max', age : 28},
      {id :'as', name:'Swam', age : 21},
      {id :'zx', name:'Manu', age : 18}
    ],
    showPersons : true
  }

  switchNameHandler =(newName) =>{

   // console.log('was clicked ?');
   // DON'T DO THIS : this.state.persons[0].name ='Maximilion';
   this.setState({
       persons : [
        {name: newName, age : 28},
        {name:'Swam', age : 21},
        {name:'Manu Tiwari', age : 8}
       ]
     }
     )}

     nameChangedHamdler = (event,id) =>{

      const personIndex =this.state.persons.findIndex(p =>{
        return p.id===id;
      });

      const person = {
        ...this.state.persons[personIndex]
      }

      //Alternative approach
      //const person = Object.assign({}, this.state.persons[personIndex]);

      person.name = event.target.value;

      const persons = [...this.state.persons] 
      persons[personIndex] = person;

      this.setState({persons : persons})
     }

     togglePersonsHandler =() =>{
        const doesShow = this.state.showPersons;
        this.setState({showPersons : !doesShow})
     }

     deletePersonHandler =(personIndex) =>{
     //  const persons = this.state.persons.slice();
     const persons = [...this.state.persons];    // ES6 Approch
     persons.splice(personIndex,1);
       this.setState({persons : persons});

     }




  render() {
      // Inline styles 
      // this is java script code
      const style = {
        backgroundColor : 'green',
        font: 'inherit',
        border : '1px solid blue',
         padding: '8px',
        cursor: 'pointer',
      }

      let persons = null;
      if(this.state.showPersons)
      {
        persons =(<div>
          {
            this.state.persons.map((person,index)=>{
              return <Person
               click={() => this.deletePersonHandler(index)}
               name={person.name} 
               age={person.age}
               key={person.id} 
               changed={(event)=> this.nameChangedHamdler(event, person.id)}/>
            })}
         </div>);
         style.backgroundColor = 'red';

      }


     // let classes =['red','bold'].join(' ');   // "red bold"
          const classes=[];
          if(this.state.persons.length<=2)
          {
            classes.push('red');
          }
          if(this.state.persons.length<=1)
          {
            classes.push('bold');
          }


    return ( 
      // this is JSX code
      //  alternative way of calling function : onClick = {()=> this.switchNameHandler('Rajesh')} but 
      // this can be inefficient . example shown below
      
      <div className="App">        
      
      <h1>Hi, I am React App</h1>
      <p className={classes.join(' ')}>This is really working....</p> 
      
      <button
      style ={style} 
      onClick= {this.togglePersonsHandler} >Toggle Persons</button>  
      {persons}
      
      </div>
      
    );
  }
}

export default App;