
import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public/v1/');




const TOKEN = '32ec915f85854aeffccdbbe0c33e65599f6e464b0339d8f90cfc434cbc48b955' ;




export const createRandomUser = async () => {
    const userData = {
        email: `test-${Math.floor(Math.random() * 9999)}@mail.ca`,
        name: 'Test name',
        gender: 'male',
        status: 'inactive',
      };

      const res = await request
      .post('users')
      .set('Authorization', `Bearer ${TOKEN}`)
      .send(userData)
        return res.body.data.id;
    





};