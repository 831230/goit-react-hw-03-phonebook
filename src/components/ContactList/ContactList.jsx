import PropTypes from 'prop-types';

const ContactList = ({ names, btnAction }) => {
  return (
    <ul>
      {names &&
        names.map(name => {
          return (
            <li key={name.id}>
              {name.name}
              &#58;&#8194;{name.number}
              <button onClick={() => btnAction(name.id)}>Delete</button>
            </li>
          );
        })}
    </ul>
  );
};

ContactList.propTypes = {
  names: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  btnAction: PropTypes.func,
};

export default ContactList;
