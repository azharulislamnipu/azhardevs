import React, { Component } from "react";
import { connect } from "react-redux";
import ellipse from "../../../img/svg/ellipse.svg";
import playbutton from "../../../img/svg/play-button.svg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { loadBanners } from "../../../store/actions/bannerActions";
import { loadCV } from "../../../store/actions/cvActions";
import BannerDetails from './bannerDetails';
class Banner extends Component {
  componentDidMount() {
    this.props.loadBanners();
    this.props.loadCV();
  }
  render() {
    let { banners } = this.props.banners;
    let { cvs } = this.props.cvs;
    const showBanner =
      banners.length > 0 ? (
        banners.map((banner, key) => {
          if (banner.status === "publish") {
            return <BannerDetails banner={banner} cvs={cvs} key={key}/>;
          }
        })
      ) : (
        <span>No Banner Data Available</span>
      );

    return (
      <section className="hero-bannner" id="home">
        <div className="hero-inner-wrraper cliping-mask bg-primary">
          <Container>
            {showBanner}

            <Row className="pt-2 pb-2">
              <Col>
                <AnchorLink href="#about" offset="100" className="down">
                  <span className="down-one"></span>
                  <span className="down-two">About Me</span>
                  <span className="down-three"></span>
                </AnchorLink>
              </Col>
            </Row>
          </Container>
        </div>

        <img src={ellipse} alt="image" className="icon-shape-1" />
        <img src={playbutton} alt="image" className="icon-shape-2" />
      </section>
    );
  }
}
const mapStateToProps = state => ({
  banners: state.banner,
  cvs: state.cv
});

export default connect(mapStateToProps, { loadBanners, loadCV })(Banner);
