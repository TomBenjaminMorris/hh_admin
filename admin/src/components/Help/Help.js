import React from "react";
import classes from "./Help.css";
import facebook_icon from "../../assets/icons/facebook.png";
import twitter_icon from "../../assets/icons/twitter.png";
import instagram_icon from "../../assets/icons/instagram.png";
import email_icon from "../../assets/icons/email.png";

const links = [
  {
    link: "https://www.facebook.com/hapihour.io",
    icon: facebook_icon,
  },
  {
    link: "https://twitter.com/hapihour_io",
    icon: twitter_icon,
  },
  {
    link: "https://www.instagram.com/hapihour.io/",
    icon: instagram_icon,
  },
  {
    link: "mailto:hapihour.io@gmail.com",
    icon: email_icon,
  },
];

const help = (props) => {
  return (
    <div className={classes.Help}>
      {/* <h3>
        For further information or support, reach out to us via the below links:
      </h3> */}
      <div className={classes.HelpLinks}>
        {links.map((link, i) => {
          return (
            <a key={i} href={link.link}>
              <img src={link.icon} alt="link"/>
            </a>
          );
        })}
      </div>
      <div className={classes.Description}>
        <p>
          Welcome to the hapihour.io admin centre. This site is designed to give
          you, the bars, the tools to add and maintain your happy hour deals. By
          having an account and keeping your details up-to-date ensures that
          your potential customers are aware of the latest deals that you are
          offering at any given time. At hapihour.io, we want to give you the
          features and functionality that you need to attract more potential
          customers. With that in mind if you have any feature requests or
          require support in getting your deals added please contact us on any
          of our social links.
        </p>
      </div>
    </div>
  );
};

export default help;
