import React from "react";
import firebase from "../auth/base";
import firedatabase from "../auth/base";
import Moment from "react-moment";
import "../../Stylesheets/global.css";
import "../../Stylesheets/hairprofile.css";

import sean from "../../images/sean.JPG";
import picOfgirlOne from "../../images/sel1.jpg";

class HairProfile extends React.Component {
  state = {
    myprofile: [],
    uid: " "
  };
  componentDidMount = () => {
    this.fetchCurrentUser();
  };
  fetchCurrentUser = async () => {
    var user = firedatabase.auth().currentUser;
    var uid;
    if (user != null) {
      //   name = user.displayName;
      //   email = user.email;
      //   photoUrl = user.photoURL;
      //   emailVerified = user.emailVerified;
      uid = user.uid;
    }
    this.setState({
      uid: user.uid
    });
    firebase
      .firestore()
      .collection("Quiz_list")
      .where("userid", "==", user.uid)
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        this.setState({ myprofile: data });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  };

  render() {
    const { myprofile } = this.state;

    return (
      <section className="dashSections">
        <div className="profile-box ">
          <img className="img-fluid" src={sean} alt="shawn" />
          {myprofile.map(myprofiles => (
            <>
              <ul className="profile">
                <li>
                  <span className="profile-text">Full Name:</span>
                  {myprofiles.firstname} {myprofiles.lastname}
                </li>
                <li>
                  <span className="profile-text">Gender:</span>
                  {myprofiles.Gender}
                </li>
                <li>
                  <span className="profile-text">Type:</span>{" "}
                  {myprofiles.hairType}
                </li>
                <li>
                  <span className="profile-text">Color:</span>
                  {myprofiles.NowColor}
                </li>
                <li>
                  <span className="profile-text">Length:</span>
                  {myprofiles.length}
                </li>
              </ul>
            </>
          ))}
        </div>
      </section>
    );
  }
}
export default HairProfile;
