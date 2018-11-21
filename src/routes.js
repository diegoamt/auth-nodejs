import {createUser, login} from "./controllers/user.controller";
import {addNewContact, deleteContact, updateContact, getContact, getContacts} from "./controllers/contact.controller";
import ensureAuthenticated from './controllers/middleware';


const setRoutes = (app) => {
    app.get('/login', login);
    app.post('/sign-up', createUser);

    app.route('/contact', ensureAuthenticated)
        // get all contacts
        .get((req, res, next) => {
            console.log(`request from: ${req.originalUrl}`);
            console.log(`request type: ${req.method}`);
            next();
        }, getContacts)
        // create new contact
        .post(addNewContact);

    app.route('/contact/:contactId', ensureAuthenticated)
        // update contact by id
        .put(updateContact)
        // delete contact by id
        .delete(deleteContact)
        // get particular contact by id
        .get(getContact);
};

export default setRoutes;