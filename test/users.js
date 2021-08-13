import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public/v1/');

import { expect } from 'chai';

const TOKEN ='32ec915f85854aeffccdbbe0c33e65599f6e464b0339d8f90cfc434cbc48b955';

describe('Users',() => {
    it('GET /users',() => {

     // request.get(`users?access-token=${TOKEN}`).end((err , res) => {
     // expect(res.body.data).to.not.be.empty;
     // done();
     // });  

     return request.get(`users?access-token=${TOKEN}`).then((res) => {
        expect(res.body.data).to.not.be.empty;
        
        }); 
    });
    it('GET /users:id',() => {

        return request.get(`users/24?access-token=${TOKEN}`).then((res) => {
            expect(res.body.data.id).to.be.eq(24);
    });
});
    it('GET /users with query params',() => {
    const url =  `users?access-token=${TOKEN}&page=5&gender=female&status=active`;
    
    return request.get(url).then((res) => {
        expect(res.body.data).to.not.be.empty;
        res.body.data.forEach((data) => {
            expect(data.gender).to.eq('female');
              expect(data.status).to.eq('active');
           
              
            });
});  
});
 
it('POST /users', () => {
    const data = {
      email: `test-${Math.floor(Math.random() * 9999)}@mail.ca`,
      name: 'Aliemeen',
      gender: 'male',
      status: 'inactive',
    };

    return request
      .post('users')
      .set('Authorization', `Bearer ${TOKEN}`)
      .send(data)
      .then((res) => {
        expect(res.body.data).to.deep.include(data);
        
      });
  });
  it('PUT /users/:id', () => {
    const data = {
      status: 'active',
      name: `Aliemeen - ${Math.floor(Math.random() * 9999)}`,
    };

    return request
      .put(`users/24`)
      .set('Authorization', `Bearer ${TOKEN}`)
      .send(data)
      .then((res) => {
        expect(res.body.data).to.deep.include(data);
      });
  });


  it('DELETE /users/:id', () => {
    return request
      .delete('users/1996')
      .set('Authorization', `Bearer ${TOKEN}`)
      .then((res) => {
          console.log(res.body);
        expect(res.body.data).to.be.eq(null);
      });
  });


});