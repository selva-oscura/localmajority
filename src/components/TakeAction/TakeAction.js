import React, { Component } from 'react';
import Filters from '../common/Filters/Filters';
import ButtonlessFilters from '../common/Filters/ButtonlessFilters';
import Aux from '../common/Aux';
// import './TakeAction.css';

class TakeAction extends Component {
  state = {
    stateSelected: this.props.match.params.state,
  };

  updateFilter = (filterCategory, selectedValue) => {
    selectedValue === 'all'
      ? this.props.history.push('/take-action')
      : this.props.history.push(`/take-action/${selectedValue}`);
  };

  componentDidMount(){
    // redirect to /take-action if /take-action/:state is not a state for which we have information
    //(shouldn't be called if picking state from selector on page, but if directly typing in url or following faulty link this will redirect to the default page)
    if(this.props.match.params.state && !this.props.statesMasterList.includes(this.props.match.params.state)){
      this.props.history.push('/take-action');
    }
  }

  render() {
    const { statesMasterList } = this.props;
    const regionText =
      !this.state.stateSelected ? 'America' : this.state.stateSelected;

    return (
      <article className="TakeAction">
        <h2 className="tertiary-text-color">
          NOTE: content in red on this page is currently being used to specify
          content that will need to be changed in response to the individual
          state. In the long-run we may want to use red for deadlines and other
          particularly emphasized issues....
        </h2>
        <section>
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
        </section>

        <hr />

        <section>
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
              <p>Hope to see you at the polls.  The next criticla election in {this.state.stateSelected} is <span className="tertiary-text-color">whatever the date should be</span>.</p>
            </Aux>
          )}
        </section>

        <hr />

        <section>
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
              <p className="tertiary-text-color">Some Allowed Reasons to Sign up for an Absentee Ballot:</p>
              <ul>
                <li>Commute to a different city/county</li>
                <li>Work/commute more than 11 hours</li>
                <li>Pregnant</li>
                <li>Disabled</li>
                <li>Out of Town on Election Day</li>
                <li>First Responder</li>
                <li>Confined, awaiting trial</li>
                <li>Student away at college</li>
                <li>
                  See other reasons{' '}
                  <a href="" target="absentee-reasons">
                    here
                  </a>
                </li>
              </ul>
            </Aux>
          )}
        </section>

        <hr />

        <section>
          <h2>Volunteer</h2>
          <h2 className="text-right secondary-text-color">
            <i>Join Our Team</i>
          </h2>
          <h3>Want to Help Turn State Legislatures Back to Blue? </h3>
          <p>Don’t just spend time answering online petitions!</p>
          <p>Join Local Majority to help with our research and outreach work. The work can be done from your home.</p>
          <div className="row">
            <div className="col-6 order-2 col-sm-12 order-sm-1">
              <h3 className="hidden-sm-up text-left">Local Majority<br />Volunteers Needed</h3>
              <h3 className="hidden-xs-down text-center">Local Majority Volunteers Needed</h3>
            </div>
            <div className="col-6 order-1 col-sm-4 order-sm-2">Icon</div>
            <div className="col-6 order-3 col-sm-4 order-3">
              <ul>
                <li>Researchers</li>
                <li>Writers</li>
                <li>Editors</li>
              </ul>
            </div>
            <div className="col-6 col-sm-4 order-4">
              <ul>
                <li>Videographers</li>
                <li>Graphic Designers</li>
                <li>Web Designers and IT</li>
              </ul>
            </div>
          </div>
          <h2 className="text-right secondary-text-color">
            <i>Get Out the Vote</i>
          </h2>
          {!this.state.stateSelected ? (
            <Aux>
              <h3>Interested in Reaching out to People from your State? </h3>
              <p>Mobilize can hook you in to Democratic campaigns for canvassing and phonebanking opportunities!</p>
            </Aux>
          ):(
            <Aux>
              <p>If you live near {this.state.stateSelected}, Mobilize can hook you in to Democratic campaigns for <span className="tertiary-text-color">House of Delegates or whatever it is called IN THAT STATE (NEED STATE-SPECIFIC TERMS in the database!)</span> for canvassing and phonebanking. Opportunities <span className="tertiary-text-color">this weekend</span>!</p>
              <p>{this.state.stateSelected} elections on <span className="tertiary-text-color">November 7, 2017</span>.</p>
            </Aux>
          )}
          <div className="row">
            <div className="col-6 order-2 col-sm-12 order-sm-1">
              <h3 className="hidden-sm-up text-left">Mobilize<br />Volunteers Needed</h3>
              <h3 className="hidden-xs-down text-center">Mobilize Volunteers Needed</h3>
            </div>
            <div className="col-6 order-1 col-sm-4 order-sm-2">Icon</div>
            <div className="col-6 order-3 col-sm-4 order-3">
              <ul>
                <li>Canvassers</li>
              </ul>
            </div>
            <div className="col-6 col-sm-4 order-4">
              <ul>
                <li>Phonebankers</li>
              </ul>
            </div>
          </div>
          <h2 className="text-center">First Step to reclaim our Democracy!!!</h2>
        </section>

        <hr />

        <h2 className="text-right secondary-text-color">
          <i>DEMOCRACY’S ONLY HOPE!</i>
        </h2>
      </article>
    );
  }
}

export default TakeAction;
