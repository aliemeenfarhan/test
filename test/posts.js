
import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public/v1/');

import { expect } from 'chai';
import { createRandomUser } from './helper/user_helper.js';

const TOKEN = '32ec915f85854aeffccdbbe0c33e65599f6e464b0339d8f90cfc434cbc48b955' ;



describe ('User Posts', () => {
let postId,userId;

before(async() => {
    userId = await createRandomUser();

      

});



    it('/posts', async () =>{ 

        
    
         

              const data = {

                user_id:userId,
                title:'Assest',
                body:'test'
            };
               
         
                
        
        
           const postRes = await request
           .post('posts')
           .set('Authorization', `Bearer ${TOKEN}`)
           .send(data);
        
         console.log(postRes.body);  
         expect(postRes.body.data).to.deep.include(data);
         postId = postRes.body.data.id;
            
   
    });


    it('GET /posts/:id', async () =>{ 

        await request
        .get('users')
        .set('Authorization', `Bearer ${TOKEN}`)
        .expect(200);
        
    });

    describe('Negative test', () => {

        it('401 Authentication failed',async () => {
            const data = {

                user_id:userId,
                title:'Assest',
                body:'test'
            };
               
         
                
        
        
           const postRes = await request
           .post('posts')
           .send(data);
        
        // console.log(postRes);  
       
       expect(postRes.body.data.message).to.eq("Authentication failed");
    });

    it('422 Validation failed',async () => {
        const data = {

            user_id:userId,
            title:'Assest',
           // body:'test'
        };
           
     
            
    
    
       const postRes = await request
       .post('posts')
       .set('Authorization', `Bearer ${TOKEN}`)
       .send(data);
    
     console.log(postRes.body);  
   
   expect(postRes.body.data[0].field).to.eq('body');
   expect(postRes.body.data[0].message).to.eq("can't be blank");
});
    });
  });