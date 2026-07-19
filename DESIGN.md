# Paw Prints Website

## About

Paw Prints Rescue & Rehoming is a local organisation that focuses on rescueing and rehoming stray dogs. They have requested we build them a new Website / App, as their current one does not meet their needs. The new website will be cleaner and more interactive.

## Preface

This repo will contain a **front-end only** rough draft of the new Paw Prints app/website. This draft does not need to be functional, outside of UI components. For sections where account status affects page content, provide mock credentials. All data can be hard coded

## Content

### Home

A central page describing the organisation, its mission and its values. This will be the landing page

#### Content

- Navbar

- Title

- Mission statement

- Adopter stories (3)

- What Paw Prints does

- Contact

### Donations Gateway

A page detailing how visitors can help Paw Prints. Physical donations, such as blankets and food can be made (TODO: Find out what items should have an emphasis placed on them) as well as cash donations. This page will allow the user to make donations through a PayFast gateway.

#### Content

- Motivation

- Ways to donate

- What cash donations go to

- Donation gateway (PayFast)

### Volunteer Gateway

A page detailing how volunteers can help Paw Prints by donating their time. Paw often hosts fundraisers for which they will need help, but also need regular volunteers to help in the general running of the facility. TODO: For regulars, an account + calendar/schedule system could be good.

#### Index

- Card list of upcoming events

- Clicking a card takes a user to event signup

- Fully booked events are greyed out

#### Sign up

- Event details (Where, when & what)

- Sign up form

- Name & Surname

- TODO: Ask PawPrints what they need. Keep it minimal

### Dogs

A CRUD workflow focusing on the dogs kept at Paw Prints. Users can browse dogs and begin the adoption process. Admins can add new dogs to the system, and edit existing ones.

#### Index

- Grid of cards. Each card contains

- Photo

- Age

- Breed

- Gender

- Short description

- Filter controls for age, breed & gender

- ‘Add’ button for admin

#### Details

- Pop-up card

- Details

- Photo

- Age

- Breed

- Gender

- Description

- Adopt button leading to adoption form

#### Adoption Form

- Name & Surname

- TODO: The form on their current website is very long, and will likely affect adoption rates. We should speak to them about shortening it.

### Blogs

A section allowing admin at Paw Prints to post regular content in the form of blogs.

#### Homepage

- Feed of cards. Each card has

- Title

- Photo (Optional)

- Brief

#### Blog Page

- Title

- Photo (Optional)

- Body

### Dog Matcher

A ‘dating app’ styled system that matches users with dogs in need of adoption. Users will first be prompted to enter details about themselves. An LLM will then use this information to find matching dogs in the database.

#### Index

First time:

- User details form

- TODO: Figure out what an AI would need to match users with dogs

Else:

- ‘Dating app’ style. Swipe cards left or right

- Dogs presented on card. Each card contains:

- Photo (Background or v. large)

- Age

- Breed

- Gender

- Description

### Communication center

An admin only page, allowing staff at pawprints to send out push notifications

#### Content
- Message box
- Send button

## Notes

- Use ``shadcn/ui``.

- Color scheme should be warm.

- Logo can be found at ``assets/logo.png``

- There are several `TODO`s in this document. When content is TODO, generate reasonable placeholders, this will be fine tuned later. If the TODO is for a future idea, ignore it completely.
