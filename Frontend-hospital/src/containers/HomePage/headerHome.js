import React, { Component } from "react";
import { connect } from "react-redux";
import "./headerHome.scss";
import logo from "../../assets/images/logo.PNG";
import vi from "../../assets/images/vi-VN.png";
import en from "../../assets/images/en-uk.png";
import iconkck from "../../assets/images/icon1.png";
import iconktx from "../../assets/images/icon2.png";
import iconktq from "../../assets/images/icon3.png";
import iconxn from "../../assets/images/icon4.png";
import iconsktt from "../../assets/images/icon5.png";
import iconknk from "../../assets/images/icon6.png";
import icongpt from "../../assets/images/icon7.png";
import iconsktd from "../../assets/images/icon8.png";
import icont from "../../assets/images/icon9.png";
import iconyt from "../../assets/images/icon10.png";
import { FormattedMessage } from "react-intl";

class HomeHeader extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>

              <img src={logo} className="logo" alt="Logo" />
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeHeader.speciality" />
                  </b>
                </div>
                <FormattedMessage id="homeHeader.search" />
                <div className="subs-title"></div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    {" "}
                    <FormattedMessage id="homeHeader.health-facility" />
                  </b>
                </div>
                <div className="subs-title">
                  {" "}
                  <FormattedMessage id="homeHeader.select-room" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    {" "}
                    <FormattedMessage id="homeHeader.doctor" />
                  </b>
                </div>
                <div className="subs-title">
                  {" "}
                  <FormattedMessage id="homeHeader.select-doctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    {" "}
                    <FormattedMessage id="homeHeader.fee" />
                  </b>
                </div>
                <div className="subs-title">
                  {" "}
                  <FormattedMessage id="homeHeader.check-heath" />
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i className="fas fa-question-circle"></i>
                <FormattedMessage id="homeHeader.support" />
              </div>
              <img src={vi} className="iconVI" alt="Icon VI" />
              <img src={en} className="iconEN" alt="Icon EN" />
            </div>
          </div>
        </div>
        <div className="home-banner">
          <div className="content-up">
            <div className="title">
              <h1>
                <FormattedMessage id="banner.title" />

                <br></br>
                <b>
                  <FormattedMessage id="banner.content" />
                </b>
              </h1>
            </div>
            <div className="search">
              <i className="fas fa-search"></i>
              <input type="text" placeholder="Tìm kiếm" />
            </div>
            <div className="app-link">
              <div className="google-play"></div>
              <div className="app-store"></div>
            </div>
          </div>
          <div className="content-down">
            <div className="options">
              <div className="option-child">
                <div className="icon-child">
                  <img src={iconkck} className="icon" />
                </div>
                <div className="text-child">
                  <FormattedMessage id="title.specialist-examination" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <img src={iconktx} className="icon" />
                </div>
                <div className="text-child">
                  <FormattedMessage id="title.remote-examination" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <img src={iconktq} className="icon" />
                </div>
                <div className="text-child">
                  <FormattedMessage id="title.general-examination" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <img src={iconxn} className="icon" />
                </div>
                <div className="text-child">
                  <FormattedMessage id="title.medical-tests" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <img src={iconsktt} className="icon" />
                </div>
                <div className="text-child">
                  <FormattedMessage id="title.mental-health" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <img src={iconknk} className="icon" />
                </div>
                <div className="text-child">
                  <FormattedMessage id="title.dental-examination" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <img src={icongpt} className="icon" />
                </div>
                <div className="text-child">
                  <FormattedMessage id="title.surgical-package" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <img src={iconsktd} className="icon" />
                </div>
                <div className="text-child">
                  <FormattedMessage id="title.diabetes-health" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <img src={icont} className="icon" />
                </div>
                <div className="text-child">
                  <FormattedMessage id="title.health-test" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <img src={iconyt} className="icon" />
                </div>
                <div className="text-child">
                  <FormattedMessage id="title.medical-near-you" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
