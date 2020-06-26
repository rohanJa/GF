## Description
    This project helps to find the user using thier Github Username and more about their github profile.

## Various Component in this project are :-

- #### [layout](./src/components/layout)
- #### [pages](./src/components/pages)
- #### [repos](./src/components/repos)
- #### [users](./src/components/users)

## Few of the Component are described below :- 

- #### [User](./src/components/users/User.js) 
    It will display the information of corresponding user when it's profile is checked.
- #### [RepoItem](./src/components/repos/RepoItem.js)
    It will display the repository of corresponding user in the User component.
- #### [Search](./src/components/users/Search.js)
    This component will help to get information of user by searching it in the search bar.
- #### [Alert](./src/components/layout/Alert.js)
    It will be invoked when Search Button is entered when no input is entered in the Search Bar.
- #### [Spinner](./src/components/layout/Spinner.js)
    It will be invoked when a search is going on a Spinner will be rendered when something is loading.
- #### [NotFound](./src/components/pages/NotFound.js)
    It will render when an errorneous link accessed.
- #### [Home](./src/components/pages/Home.js)
    It contains both Search and Users Component. 

    This project is developed in the guidance of [Brad Traversy](https://github.com/bradtraversy/)