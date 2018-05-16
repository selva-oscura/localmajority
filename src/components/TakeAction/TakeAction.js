import React, { Component } from 'react';
import { FontIcon } from 'material-ui';
import Aux from '../common/Aux';
import Filters from '../common/Filters/Filters';
import ButtonlessFilters from '../common/Filters/ButtonlessFilters';
import Section from '../common/Section/Section';
import './TakeAction.css';

class TakeAction extends Component {
  state = {
    stateSelected: this.props.match.params.state,
  };

  updateFilter = (filterCategory, selectedValue) => {
    selectedValue === 'all'
      ? this.props.history.push('/take-action')
      : this.props.history.push(`/take-action/${selectedValue}`);
  };

  componentDidMount() {
    // redirect to /take-action if /take-action/:state is not a state for which we have information
    // (shouldn't be called if picking state from selector on page, but if directly typing in url or following faulty link this will redirect to the default page)
    if (
      this.props.match.params.state &&
      !this.props.statesMasterList.includes(this.props.match.params.state)
    ) {
      this.props.history.push('/take-action');
    }
  }

  render() {
    const { statesMasterList } = this.props;
    const regionText = !this.state.stateSelected
      ? 'America'
      : this.state.stateSelected;
    const localMajorityVolunteerRoles = [
      'Researchers',
      'Writers',
      'Editors',
      'Videographers',
      'Graphic Designers',
      'Web Designers',
    ];

    const mobilizeURLs = {
      website: 'https://events.mobilizeamerica.io/',
      apple: 'https://itunes.apple.com/us/app/mobilize-america/id1245726310',
      android:
        'https://play.google.com/store/apps/details?id=org.mobilize2020.mobilize',
    };
    const mobilizeVolunteerRoles = ['Canvassers', 'Phonebankers'];

      // <article className="container">
    return (
      <article className="TakeAction">
        <Section
          hasContainer={true}
          spacingAbove={3}
          spacingBelow={3}
          background="dark"
        >
          <h2 className="tertiary-text-color">
            NOTE: content in red on this page is currently being used to
            specify content that will need to be changed in response to the
            individual state. In the long-run we may want to use red for
            deadlines and other particularly emphasized issues....
          </h2>
        </Section>

        <Section
          hasContainer={true}
          spacingAbove={3}
          spacingBelow={3}
          background="light"
        >
          <h2 className="text-right secondary-text-color">
            <i>Your Vote is Your Voice</i>
          </h2>
          <h1>Take Action!</h1>
          <h3>Select Your State</h3>
          <Filters>
            <ButtonlessFilters
              filterCategory="stateSelected"
              passedParam={this.state.stateSelected}
              masterList={statesMasterList}
              updateFilter={this.updateFilter}
            />
          </Filters>
        </Section>

        <Section
          hasContainer={true}
          spacingAbove={3}
          spacingBelow={3}
          background=""
        >
          <h2 className="text-right secondary-text-color">
            <i>Voting is not a Spectator Sport</i>
          </h2>
          <h2>Voter Registration</h2>
          {!this.state.stateSelected ? (
            <Aux>
              <h4>Are you Registered to Vote?</h4>
              <h4 className="text-center">
                Is your Voter Registration Information Accurate?
              </h4>
              <h4 className="text-right">
                Looking for General Voting &amp; Registration Information?
              </h4>
              <p>
                To see voter and registration information for your state,
                please select your state above.
              </p>
            </Aux>
          ) : (
            <Aux>
              <h4>Are you Registered to Vote?</h4>
              <p>
                Register to vote at{' '}
                <a
                  href="https://vote.elections.virginia.gov/Registration/Eligibility"
                  target="register"
                >
                  <span className="tertiary-text-color">
                    https://vote.elections.virginia.gov/Registration/Eligibility
                  </span>
                </a>
              </p>
              <h4>
                Is your Voter Registration Information Current and Accurate?
              </h4>
              <p>
                Check your registration details at{' '}
                <a
                  href="https://vote.elections.virginia.gov/VoterInformation"
                  target="accurate"
                >
                  <span className="tertiary-text-color">
                    https://vote.elections.virginia.gov/VoterInformation
                  </span>
                </a>
              </p>
              <h4>
                Looking for General Voting &amp; Registration Information?
              </h4>
              <p>
                Check what's on your ballot, your polling location, what
                voter photo ids are valid, upcoming elections,
                accessibility, and much more at{' '}
                <a
                  href="https://www.elections.virginia.gov/voter-outreach/"
                  target="voter-outreach"
                >
                  <span className="tertiary-text-color">
                    https://www.elections.virginia.gov/voter-outreach/
                  </span>
                </a>
              </p>
              <p>
                Hope to see you at the polls. The next criticla election in{' '}
                {this.state.stateSelected} is{' '}
                <span className="tertiary-text-color">
                  whatever the date should be
                </span>.
              </p>
            </Aux>
          )}
        </Section>
        
        <Section
          hasContainer={true}
          spacingAbove={3}
          spacingBelow={3}
          background="light"
        >
          <h2 className="text-right secondary-text-color">
            <i>
              Your Vote Counts More than Ever!<br />
              &amp; it is the Only Way to turn {regionText} Blue Again
            </i>
          </h2>
          <h2>Vote By Mail</h2>
          {!this.state.stateSelected ? (
            <Aux>
              <h4>
                An Absentee Ballot (Vote By Mail) can Help You Avoid the
                Lines and Give you Peace of Mind on Election Day.
              </h4>
              <p>
                To see if you can vote by mail, select your state above.
              </p>
            </Aux>
          ) : (
            <Aux>
              <h4>
                {this.state.stateSelected} Absentee Ballot Application
              </h4>
              <p>
                You can also apply to vote absentee{' '}
                <span className="tertiary-text-color">
                  as early as one year
                </span>{' '}
                before the election. Ballots are available 45 days before
                most elections. The deadline for receipt of your application
                to vote absentee by mail is{' '}
                <span className="tertiary-text-color">
                  5:00 PM the Tuesday before the election
                </span>. You can contact{' '}
                <span className="tertiary-text-color">
                  the State Board of Elections at 800-552-9745 or
                  info@sbe.virginia.gov
                </span>.
              </p>
              <p>
                Click{' '}
                <a href="" target="absentee">
                  here
                </a>{' '}
                for online Absentee Ballot Registration.
              </p>
              <p>
                <span className="secondary-text-color">
                  Deadline to register to vote
                </span>{' '}
                or update an existing registration, for the{' '}
                <span className="tertiary-text-color">
                  November 7, 2017 General
                </span>{' '}
                Election is{' '}
                <span className="tertiary-text-color">
                  Monday, October 16, 2017
                </span>
              </p>
              <p>
                <span className="secondary-text-color">
                  Deadline to request an absentee ballot
                </span>{' '}
                to be mailed to you is{' '}
                <span className="tertiary-text-color">
                  5:00 p.m. Tuesday, October 31, 2017
                </span>. Your request must be received by your Registrar by
                5:00 p.m.
              </p>
              <p>
                It only takes a couple minutes to sign up for an absentee
                ballot!
              </p>
              <p>
                Then vote from the convenience of your home. No more rushing
                from work to the polls. No more waiting in long lines at the
                polls.
              </p>
              <p>
                Reasons to Sign up for an Absentee Ballot:
              </p>
              <ul>
                <li className="tertiary-text-color">Commute to a different city/county</li>
                <li className="tertiary-text-color">Work/commute more than 11 hours</li>
                <li className="tertiary-text-color">Pregnant</li>
                <li className="tertiary-text-color">Disabled</li>
                <li className="tertiary-text-color">Out of Town on Election Day</li>
                <li className="tertiary-text-color">First Responder</li>
                <li className="tertiary-text-color">Confined, awaiting trial</li>
                <li className="tertiary-text-color">Student away at college</li>
                <li className="tertiary-text-color">
                  See other reasons{' '}
                  <a href="" target="absentee-reasons">
                    here
                  </a>
                </li>
              </ul>
            </Aux>
          )}
        </Section>

        <Section
          hasContainer={true}
          spacingAbove={3}
          spacingBelow={3}
          background="  "
        >
          <h2>Volunteer</h2>
          <h2 className="text-right secondary-text-color">
            <i>Join Our Team</i>
          </h2>
          <h3>Want to Help Turn State Legislatures Back to Blue? </h3>
          <p>Don’t just spend time answering online petitions!</p>
          <p>
            Join Local Majority to help with our research and outreach work.
            The work can be done from your home.
          </p>
          <div className="row">
            <div className="col-6 order-2 col-sm-12 order-sm-1">
              <h3 className="hidden-sm-up text-left">
                Local Majority<br />Volunteers Needed
              </h3>
              <h3 className="hidden-xs-down text-center">
                Local Majority Volunteers Needed
              </h3>
            </div>
            <div className="col-6 order-1 col-sm-4 order-sm-2">
              <img
                src="../images/local_majority_banner.png"
                className="full-width"
                alt="local majority logo"
              />
            </div>
            <div className="col-6 order-3 col-sm-4 order-3">
              {localMajorityVolunteerRoles
                .slice(0, Math.ceil(localMajorityVolunteerRoles.length / 2))
                .map((role, i) => (
                  <p key={i}>
                    <FontIcon className="fa fa-star star-bullet" />
                    {` ${role}`}
                  </p>
                ))}
            </div>
            <div className="col-6 col-sm-4 order-4">
              {localMajorityVolunteerRoles
                .slice(Math.ceil(localMajorityVolunteerRoles.length / 2))
                .map((role, i) => (
                  <p key={i}>
                    <FontIcon className="fa fa-star star-bullet" />
                    {` ${role}`}
                  </p>
                ))}
            </div>
          </div>
          <h2 className="text-right secondary-text-color">
            <i>Get Out the Vote</i>
          </h2>
          {!this.state.stateSelected ? (
            <Aux>
              <h3>
                Interested in Reaching out to People from your State?{' '}
              </h3>
              <p>
                Local Majority has partnered with Mobilize to take back
                control of state legislatures. It’s critical for Democrats
                to fight gerrymandering and ensure every citizen has a vote.
                Mobilize helps connect volunteers with high-impact, local
                races. Supporting these races will help Democrats start
                flipping states blue again and preserve our Democracy.
              </p>
              <h3>
                Mobilize can hook you in to Democratic campaigns for
                canvassing and phonebanking opportunities!
              </h3>
            </Aux>
          ) : (
            <Aux>
              <p>
                If you live near {this.state.stateSelected}, Mobilize can
                hook you in to Democratic campaigns for{' '}
                <span className="tertiary-text-color">
                  House of Delegates or whatever it is called IN THAT STATE
                  (NEED STATE-SPECIFIC TERMS in the database!)
                </span>{' '}
                for canvassing and phonebanking. Opportunities{' '}
                <span className="tertiary-text-color">this weekend</span>!
              </p>
              <p>
                {this.state.stateSelected} elections on{' '}
                <span className="tertiary-text-color">
                  November 7, 2017
                </span>.
              </p>
            </Aux>
          )}
          <div className="row">
            <div className="col-6 order-2 col-sm-12 order-sm-1">
              <h3 className="hidden-sm-up text-left">
                Mobilize<br />Volunteers Needed
              </h3>
              <h3 className="hidden-xs-down text-center">
                Mobilize Volunteers Needed
              </h3>
            </div>
            <div className="col-6 order-1 col-sm-4 order-sm-2">
              <img
                src="../images/mobilizelogo.jpg"
                className="full-width"
                alt="mobilize logo"
              />
            </div>
            <div className="col-6 order-3 col-sm-4 order-3">
              {mobilizeVolunteerRoles
                .slice(0, Math.ceil(mobilizeVolunteerRoles.length / 2))
                .map((role, i) => (
                  <p key={i}>
                    <FontIcon className="fa fa-star star-bullet" />
                    {` ${role}`}
                  </p>
                ))}
            </div>
            <div className="col-6 col-sm-4 order-4">
              {mobilizeVolunteerRoles
                .slice(Math.ceil(mobilizeVolunteerRoles.length / 2))
                .map((role, i) => (
                  <p key={i}>
                    <FontIcon className="fa fa-star star-bullet" />
                    {` ${role}`}
                  </p>
                ))}
            </div>
          </div>
        </Section>
        
        <Section
          hasContainer={true}
          spacingAbove={3}
          spacingBelow={3}
          background="light"
        >
          <h2 className="text-center">
            First Step to reclaim our Democracy!!!
          </h2>

          <h2 className="text-right secondary-text-color">
            <i>DEMOCRACY’S ONLY HOPE!</i>
          </h2>
        </Section>
      </article>
    );
  }
}

export default TakeAction;
