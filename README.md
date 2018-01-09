# goodfuckingcall.com
This repo is for the site [goodfuckingcall.com](https://goodfuckingcall.com). Code is publicly available and awful, but it was thrown together in a matter of hours. Site is hosted with [Netlify](https://netlify.com).

## What the hell is this?
The name came from an inside joke, but worked well for what this site actually is... A bunch of dumb (yet hilarious) phrases, followed by "Good fucking call, bro". The whole point is to allow pull requests for more hilarious phrases so we can laugh every time we load the page.

---

## Contributing

### Adding more phrases (or sarcasms)
The more content, the better. Just follow some basic steps and rules:

1. Fork this repo.
2. Add phrases/sarcasms in JSON format within the correct category file in `categories/`. (See README in that directory for more information)
3. Commit and submit a pull request.

#### Phrase Rules

1. Should be hilarious and sound right when adding "Good fucking call, bro..." at the end of it.
2. Should be within 1 to 20 words max (unless it's really good).
3. Should not include identifiable information (ex. phone number, addresses, credit card numbers, etc.)
4. Should not be racist or offensive, but can contain swears.
5. Make sure it fits within the category in which you are adding it to.
6. Ensure you spell-check, unless it's meant to be misspelled. (I suck at this myself, so don't be like me)
7. Make sure it's not the same as any other phrases, including in other categories unless it makes sense. (I'm going to build a simple check for this in the near future)
8. I can add inside jokes, but you shouldn't unless they are absolutely hilarious.
9. Do not remove phrases because you do not like them, submit an issue and let us know why you think one should be removed.
10. Try to submit as many phrases as you can in one pull request, it will make it faster getting them all out there.
10. IDK, use common sense.

### Adding Categories
Same as adding phrases, but you just need to add a new `.json` file into the `categories/` directory in the repo. The name of the file should be the category name (ex. `categories/stupid.json`). Be sure to add it to the README in that directory!

#### Category Rules

1. Category should be broad enough to encompass many different phrases, not just a small handful.
2. You must submit at least 5 phrases when creating a category.
3. Don't create a category around a single person unless they are significant (nobody gives a shit about Sam's Mom).
4. JSON should be in proper array format and checked prior to submitting.
5. Right now, categories are singal words, but multiple words will be supported soon (get a head start by adding a dash in between words `stupid-moms.json`).
6. Same as phrases, cannot be racist or overly offensive.

### Code Changes
You looked at my code, didn't you. Shame, shame. I warned you it was thrown together in a couple of hours. I will eventually improve the code base to be more efficient and maybe put some of those fany comments in there, but for now, it works. You want to add a feature or refactor some of my garbage, cool, submit a pull request. I can't promise everything will be merged, but we'll cross that bridge when it comes. Just don't be an asshat and change indentation from 4 spaces to 2 spaces or tabs, you'll ruin my day real quick, asshat.

### I'm a contributor now!
Awesome, thanks for making this site legit AF. As a token of our appreciation, add yourself to the `humans.txt` and `contributors` section of `package.json`. If you really like this site and want to advertise your page, reddit account, twitter or myspace (if you're still living in the 90's; I wish I was), I will have a GitTip setup soon enough to get your rad self on the site.

### Moderators/Contributors
If this ever blows up and becomes viral, god help my soul. I'll be looking for a few reputible people who can join me in approving pull requests and hammering down on trolls. If you are interested, send me an email. If you cannot find my email, then you shouldn't be applying.

---

## General Rules

Listen, this is supposed to be fun and hilarious, don't be that guy or girl. Some humor may rub people the wrong way, so think about that since your commit history is tied back to your account. There will be a few contributors in which can merge pull requests and each one is going to ensure that any pull request fits within all the rules above, otherwise it will be declined.

---

## Deployments
Don't you worry about how the deployments work, it's god damn magic. Just know that once we merge in your pull request to `master`, magic begins and your hard-earned contributions will be in production. Technology these days...

## Running/Testing Locally
It sorta works, but needs a bit of an overhaul. You can test certain functionality and the default category locally, but other categories, etc. is not yet working. It's on my radar.

---

## License
All the shit here is licensed under the MIT license, so you're good to use it as you wish, but not sure why you would want to. See `LICENSE` in the repo to read all that generic licensing mumbo-jumbo.

## I'm offended
In all honesty, this is not made to be offensive or upset people, it's for fun. If you find that something is really offensive and shouldn't be on the site, submit an issue (or email me). Listen, we are doing our best to make sure everything is in good fun.

## Need more docs?
Hahaha, just kidding. You're looking at them. (Ehh, I'll eventually document how this all works in the near future)
