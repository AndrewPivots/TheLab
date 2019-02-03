/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

         it('have urls', function(){
           let badUrls = 0;
           let i = 0;
           allFeeds.forEach(function(){
             let url = allFeeds[i].url;
             if(!url || url.length < 4){ //improve: not bullet proof
               badUrls++
             }
             i++;
           });//forEach
           expect(badUrls).toBe(0); //improve: the error could be clearer
           });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         it('has names', function(){
           let badNames = 0;
           let i = 0;
           allFeeds.forEach(function(){
             let name = allFeeds[i].name;
             if(!name || name.length < 4){ //improve: not bullet proof
               badNames++
             }
             i++;
           });//forEach
           expect(badNames).toBe(0); //improve: the error could be clearer
           });

    });

    /* TODO: Write a new test suite named "The menu" */

    describe('The menu', function(){

      const body = document.getElementsByTagName('body');
      const menuB = document.getElementsByClassName('menu-icon-link');
      const menuE = document.getElementsByClassName('slide-menu');

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

         it('is hidden by default', function(){
           expect(body[0].className).toBe('menu-hidden'); //improve: to check actual menu css
         });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

          //difficult one. I don't know how to do this without turning it on and off real quick.
          // spent a lot of time trying to find a way to not actually change the visual part. may not be possible.
          //improve: does not check actual css or visual. should figure that out.

        it('does the menu appear and disappear on clicks', function(){
          displayErrors = 0;
          menuB[0].click();
          let bodyC = body[0].className;
          if(bodyC == "menu-hidden"){ //improve: not handle other classes well
            displayErrors++;
          }
          menuB[0].click();
          bodyC = body[0].className;
          if(!bodyC == "menu-hidden"){ //improve: not handle other classes well
            displayErrors++;
          }
          expect(displayErrors).toBe(0);
        });

    }); // the menu


    /* TODO: Write a new test suite named "Initial Entries" */

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

         //review: that done() still makes no sense to me.

         describe('Initial Entries', function(){
           beforeEach(function(done){
             loadFeed(0, function(){
               done();
             });
           });
           it('has at least one', function(){
             let feed = document.getElementsByClassName('feed');
             expect(feed[0].childElementCount).not.toBe(0);
           });
         });

    // old way that only semi-worked
    // describe('Initial Entries', function(){
    //   beforeEach(function(done){
    //
    //   });
    //   let feed = document.getElementsByClassName('feed');
    //   while(feed[0].childElementCount < 1){
    //     feed = document.getElementsByClassName('feed');
    //   }
    //   it('has at least one', function(){
    //     expect(feed[0].childElementCount).not.toBe(0);
    //   });
    // });

    /* TODO: Write a new test suite named "New Feed Selection" */

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

         //review: seems to work but it makes the page load look bad.
         // i don't like how test effect the user experience. Maybe I'm just doing it wrong.

         describe('Initial Entries', function(){
           var item1,
              item2, feed;
           beforeEach(function(done){
             loadFeed(2, function(){
               feed = document.getElementsByClassName('feed');
               item1 = feed[0].innerHTML;
             });
             loadFeed(0, function(){
               feed = document.getElementsByClassName('feed');
               item2 = feed[0].innerHTML;
               done();
             });
           });
           it('change content', function(){
                            console.log(item1);
                            console.log(item2);
             expect(item1 === item2).not.toBe(true);
           });
         });

         // this was never going to work but i'll keep it here for reference for a bit.
         // let feed = document.getElementsByClassName('feed');
         // let item1 = feed[0].innerHTML;
         // console.log(item1, feed);
    //      let item2
    // describe('New Feed Selection', function(){
    //
    //   it('changes content', function(){
    //     // expect(feed html to change )
    //   });
    // });

}());