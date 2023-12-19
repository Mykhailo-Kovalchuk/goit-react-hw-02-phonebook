import { Component } from 'react';

import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  //Функція для отрмання даних при додаванні нового контакту (ф-цію передаємо як пропс в ContactForm, a з потім з пропсу в локальному компоненті через колбек витягуємо дані назад )
  handlerAddContact = formData => {
    // console.log(formData);
    if (this.state.contacts.some(contact => contact.name.trim().toLowerCase() === formData.name.trim().toLowerCase())) {
      alert(`${formData.name} is already in your contacts`);
    } else {
      this.setState(prevState => {
        return { contacts: [...prevState.contacts, formData] };
      });
    }
  };

  // Функція фільтрації
  handlerChangeFilter = filterValue => {
    this.setState({ filter: filterValue });
    // console.log(this.state)
  };

  //Функція видалення кнопки
  contactBtnDeleter = id => {
    console.log(id);

    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
    // return deleteArrayItem.filter(contact => contact.id !== this.state.contacts.id)
  };

  render() {
    const filteredContact = this.state.contacts.filter(contact =>
      contact.name.includes(this.state.filter)
    );

    return (
      <div
        style={{
          // height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm handlerAddContact={this.handlerAddContact} />

        <h2>Contacts</h2>
        <Filter
          contactsArray={this.state.contacts}
          handlerChangeFilter={this.handlerChangeFilter}
        />
        <ContactList
          contactsArray={filteredContact}
          contactBtnDeleter={this.contactBtnDeleter}
        />
      </div>
    );
  }
}
