import { Component } from 'react';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import Section from 'components/Section/Section';
import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import ContactList from 'components/ContactList/ContactList';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  resetForm = event => {
    event.target.name.value = '';
    event.target.number.value = '';
    this.setState({
      filter: '',
    });
  };

  saveContactsToStorage = () => {
    try {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    } catch (error) {
      console.log(error);
    }
  };

  addContact = evt => {
    evt.preventDefault();
    const valueName = evt.currentTarget.elements.name.value;
    const valueNumber = evt.currentTarget.elements.number.value;
    if (this.state.contacts.some(element => element.name === valueName)) {
      return Notiflix.Notify.warning(`${valueName} is already in contacts`);
    } else {
      this.setState(prevState => {
        return {
          contacts: [
            ...prevState.contacts,
            {
              name: valueName,
              number: valueNumber,
              id: nanoid(),
            },
          ],
        };
      });
    }
    this.resetForm(evt);
  };

  addCurrentValue = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
    });
  };

  filterContacts = () => {
    const filteredArray = [];
    this.state.contacts.filter(element => {
      if (element.name.includes(this.state.filter)) {
        filteredArray.push(element);
      }
      return filteredArray;
    });
    return filteredArray;
  };

  deleteContact = id => {
    const newContacts = [...this.state.contacts];
    const contacts = newContacts.filter(contact => contact.id !== id);
    this.setState({
      contacts,
    });
  };

  componentDidMount() {
    try {
      const contacts = JSON.parse(localStorage.getItem('contacts'));
      if (contacts) {
        this.setState({
          contacts: contacts,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      this.saveContactsToStorage();
    }
  }

  render() {
    return (
      <>
        <h1>Phonebook</h1>

        <Section>
          <ErrorBoundary>
            <ContactForm
              nameTitle={'Name'}
              numberTitle={'Number'}
              addContact={this.addContact}
            />
          </ErrorBoundary>

          <h2>Contacts</h2>
          <ErrorBoundary>
            <Filter
              filterTitle={'Finds contacts by name'}
              inputFilterValue={this.state.filter}
              addCurrentValue={this.addCurrentValue}
            />
          </ErrorBoundary>
          <ErrorBoundary>
            <ContactList
              names={this.filterContacts()}
              btnAction={this.deleteContact}
            />
          </ErrorBoundary>
        </Section>
      </>
    );
  }
}

export default App;
