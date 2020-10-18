import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import {createProfile,getCurrentProfile} from '../../actions/profileAction';
import {withRouter,Link} from 'react-router-dom';
import isEmpty from '../../validator/is-empty';

class EditProfile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      displaySocialInputs:false,
      handle:'',
      company:'',
      website:'',
      location:'',
      status:'',
      skills:'',
      githubusername:'',
      bio:'',
      twitter:'',
      facebook:'',
      linkedin:'',
      youtube:'',
      instagram:'',
      errors:{}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors)
    {
      this.setState({errors:nextProps.errors})
    }

    if(nextProps.profile.profile){
      const profile = nextProps.profile.profile;

      const skillsCSV = profile.skills.join(',');

      // if !profile, make empty string
      profile.company = !isEmpty(profile.company) ? profile.company :'';
      profile.website = !isEmpty(profile.website) ? profile.website :'';
      profile.location = !isEmpty(profile.location) ? profile.location :'';
      profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername :'';
      profile.bio = !isEmpty(profile.bio) ? profile.bio :'';
      profile.social = !isEmpty(profile.social) ? profile.social :{};
      profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter :'';
      profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook :'';
      profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube :'';
      profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram :'';
      profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin :'';

      // Set component field state
      this.setState({
        handle:profile.handle,
        company:profile.company,
        website:profile.website,
        location:profile.location,
        bio:profile.bio,
        status:profile.status,
        skills:skillsCSV,
        githubusername:profile.githubusername,
        twitter:profile.twitter,
        facebook:profile.facebook,
        linkedin:profile.linkedin,
        youtube:profile.youtube,
        instagram:profile.instagram
      });
    }
  }

  componentDidMount()
  {
    this.props.getCurrentProfile();
  }

  onSubmit(e){
    e.preventDefault();
    let profileData = {
      handle:this.state.handle,
      company:this.state.company,
      website:this.state.website,
      location:this.state.location,
      status:this.state.status,
      githubusername:this.state.githubusername,
      skills:this.state.skills,
      bio:this.state.bio,
      twitter:this.state.twitter,
      facebook:this.state.facebook,
      instagram:this.state.instagram,
      youtube:this.state.youtube,
      linkedin:this.state.linkedin
    }

    this.props.createProfile(profileData,this.props.history)
  }

  onChange(e)
  {
    this.setState({[e.target.name]:e.target.value});
  }
  render() {

    const {errors,displaySocialInputs} = this.state;

    let socialInputs;

    if(displaySocialInputs)
    {
      socialInputs = (
        <div className="mt-3">
          <InputGroup
          placeholder="Twitter Profile URL"
          name="twitter"
          icon="fab fa-twitter"
          value={this.state.twitter}
          onChange={this.onChange}
          error={errors.twitter}
          />
          <InputGroup
          placeholder="Facebook Page URL"
          name="facebook"
          icon="fab fa-facebook"
          value={this.state.facebook}
          onChange={this.onChange}
          error={errors.facebook}
          />

          <InputGroup
          placeholder="Linkedin Profile URL"
          name="linkedin"
          icon="fab fa-linkedin"
          value={this.state.linkedin}
          onChange={this.onChange}
          error={errors.linkedin}
          />

          <InputGroup
          placeholder="Youtube channel URL"
          name="youtube"
          icon="fab fa-youtube"
          value={this.state.youtube}
          onChange={this.onChange}
          error={errors.youtube}
          />

          <InputGroup
          placeholder="Instagram Profile URL"
          name="instagram"
          icon="fab fa-instagram"
          value={this.state.instagram}
          onChange={this.onChange}
          error={errors.instagram}
          />
        </div>
      )
    };

    const options = [
      { label:'* Select Professional Status', value:0 },
      { label:'Developer', value:'Developer' },
      { label:'Junior Developer', value:'Junior Developer' },
      { label:'Senior Developer', value:'Senior Developer' },
      { label:'Manager', value:'Manager' },
      { label:'Student or Learning', value:'Student or Learning' },
      { label:'Instructor or Teacher', value:'Instructor or Teacher' },
      { label:'Intern', value:'Intern' },
      { label:'Other', value:'Other' }
    ];


    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">Go Back</Link>
              <h1 className="display-4 text-center">Edit Profile</h1>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                placeholder="* Profile handle"
                name="handle"
                value={this.state.handle}
                onChange={this.onChange}
                error={errors.handle}
                info="A unique handle for your profile URL. Your Full name, Company name, nickname, etc."
                />
                <SelectListGroup
                placeholder="Status"
                name="status"
                value={this.state.status}
                onChange={this.onChange}
                error={errors.status}
                options={options}
                info="Give us an idea of where you are in your career"
                />
                <TextFieldGroup
                placeholder="Company"
                name="company"
                value={this.state.company}
                onChange={this.onChange}
                error={errors.company}
                info="Could be your own company or the one you work for"
                />
                <TextFieldGroup
                placeholder="Location"
                name="location"
                value={this.state.location}
                onChange={this.onChange}
                error={errors.location}
                info="City and State (eg. Mumbai, Maharashtra"
                />
                <TextFieldGroup
                placeholder="Skills"
                name="skills"
                value={this.state.skills}
                onChange={this.onChange}
                error={errors.skills}
                info="Please use commas to separate values (eg. HTML,CSS,Javascript,PHP)"
                />
                <TextFieldGroup
                placeholder="Github Username"
                name="githubusername"
                value={this.state.githubusername}
                onChange={this.onChange}
                error={errors.githubusername}
                info="If you want your latest repos and a Github link, include your username."
                />
                <TextAreaFieldGroup
                placeholder="Short Bio"
                name="bio"
                value={this.state.bio}
                onChange={this.onChange}
                error={errors.bio}
                info="Tell us a little about yourself."
                />
                <div className="mb-3">
                  <button type="button" className="btn btn-light" onClick={()=> {
                    this.setState(prevState=> ({
                      displaySocialInputs: !prevState.displaySocialInputs
                    }))
                  }}>
                    {displaySocialInputs ? 'Hide Social Network Links':'Add Social Network Links'}
                  </button>
                  <span className="text-muted">Optional</span>
                {socialInputs}
                </div>
                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile:state.profile,
  errors:state.errors
});

export default connect(mapStateToProps,{getCurrentProfile,createProfile})(withRouter(EditProfile));
