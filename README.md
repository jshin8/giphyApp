## Giphy App


#### Steps to run:

#### 1. Install Meteor

	curl https://install.meteor.com | sh


#### 2. Clone the repo 

	git clone https://github.com/jshin8/giphyApp.git


#### 3. Go to root

	cd giphyApp


#### 4. Install npm

	meteor npm install


#### 5. Start app

	meteor --settings settings.json


#### 6. App should be running at: http://localhost:3000/



#### There are two active A/B tests:
- Gif Loading - infinite scroll vs. button press
- Gif Interaction Button Location - overlaid on gif vs. within modal

#### Gifs rendered and favorited are counted during each user session. A user session begins/ends on each load/reload/unload of the app.

#### Test stats can be retrieved from the client (JS Console) or server (meteor shell) using the command:

	SessionFiles.find().fetch()

#### scrollTest:
	0 = button press
	1 = infinite scroll

#### favoriteTest: 
	0 = within modal
	1 = overlaid on gif
	



