import React, { Component } from 'react';
import Filters from '../Filters/Filters';
import ButtonlessFilters from '../Filters/ButtonlessFilters';
import Aux from '../common/Aux';
// import './TakeAction.css';

class TakeAction extends Component {
  state = {
    stateSelected: "",
  }

  updateFilter = (filterCategory, selectedValues) => {
    this.setState({stateSelected: selectedValues});
  };

  render(){
    const { statesMasterList } = this.props;
    const regionText = this.state.stateSelected === "" 
      ? "America" 
      : this.state.stateSelected;
    return (
      <article className="TakeAction">
        <h2 className="tertiary-text-color">NOTE: content in red on this page is currently being used to specify content that will need to be changed in response to the individual state.  In the long-run we may want to use red for deadlines and other particularly emphasized issues....</h2>
        <div className="row">
          <div className="col-xs-12">

            <section>
              <h2 className="text-right secondary-text-color"><i>Your Vote is Your Voice</i></h2>
              <h1>Take Action!</h1>
              <h3>Select Your State</h3>
              <Filters>              
                <ButtonlessFilters
                  filterCategory="stateSelected"
                  includeAll={false}
                  masterList={statesMasterList}
                  updateFilter={this.updateFilter}
                />
              </Filters>
            </section>

            <hr />

            <section>
              <h2 className="text-right secondary-text-color"><i>Voting is not a Spectator Sport</i></h2>
              <h2>Voter Registration</h2>
              {this.state.stateSelected === ""
                ? (
                  <Aux>
                    <h4>Are you Registered to Vote?</h4>
                    <h4 className="text-center">Is your Voter Registration Information Accurate?</h4>
                    <h4 className="text-right">Looking for General Voting &amp; Registration Information?</h4>
                    <p>To see voter and registration information for your state, please select your state above.</p>
                  </Aux>
                ) : (
                  <Aux>
                    <h4>Are you Registered to Vote?</h4>
                    <p>Register to vote at <a href="https://vote.elections.virginia.gov/Registration/Eligibility" target="register"><span className="secondary-text-color">https://vote.elections.virginia.gov/Registration/Eligibility</span></a></p>
                    <h4>Is your Voter Registration Information Current and Accurate?</h4>
                    <p>Check your registration details at <a href="https://vote.elections.virginia.gov/VoterInformation" target="accurate"><span className="secondary-text-color">https://vote.elections.virginia.gov/VoterInformation</span></a></p>
                    <h4>Looking for General Voting &amp; Registration Information?</h4>
                    <p>Check what's on your ballot, your polling location, what voter photo ids are valid, upcoming elections, accessibility, and much more at <a href="https://www.elections.virginia.gov/voter-outreach/" target="voter-outreach"><span className="secondary-text-color">https://www.elections.virginia.gov/voter-outreach/</span></a></p>
                  </Aux>
                )
              }
            </section>

            <hr />

            <section>
              <h2 className="text-right secondary-text-color"><i>Your Vote Counts More than Ever!<br />
                &amp; it is the Only Way to turn {regionText} Blue Again</i></h2>
              <h2>Vote By Mail</h2>
              {this.state.stateSelected === ""
                ? (
                  <Aux>
                    <h4>An Absentee Ballot (Vote By Mail) can Help You Avoid the Lines and Give you Peace of Mind on Election Day.</h4>
                    <p>To see if you can vote by mail, select your state above.</p>
                  </Aux>
                ) : (
                  <Aux>
                    <h4>{this.state.stateSelected} Absentee Ballot Application</h4>
                    <p>You can also apply to vote absentee <span className="tertiary-text-color">as early as one year</span> before the election. Ballots are available 45 days before most elections. The deadline for receipt of your application to vote absentee by mail is <span className="tertiary-text-color">5:00 PM the Tuesday before the election</span>. You can contact <span className="tertiary-text-color">the State Board of Elections at 800-552-9745 or info@sbe.virginia.gov</span>.</p>
                    <p>Click <a href="" target="absentee">here</a> for online Absentee Ballot Registration.</p>
                    <p><span className="secondary-text-color">Deadline to register to vote</span> or update an existing registration, for the <span className="tertiary-text-color">November 7, 2017 General</span> Election is <span className="tertiary-text-color">Monday, October 16, 2017</span></p>
                    <p><span className="secondary-text-color">Deadline to request an absentee ballot</span> to be mailed to you is <span className="tertiary-text-color">5:00 p.m. Tuesday, October 31, 2017</span>. Your request must be received by your Registrar by 5:00 p.m.</p>
                    <p>It only takes a couple minutes to sign up for an absentee ballot!</p>
                    <p>Then vote from the convenience of your home. No more rushing from work to the polls. No more waiting in long lines at the polls.</p>
                    <p>Some Allowed Reasons to Sign up for an Absentee Ballot</p>
                      <ul className="tertiary-text-color">
                        <li>Commute to a different city/county</li>
                        <li>Work/commute more than 11 hours</li>
                        <li>Pregnant</li>
                        <li>Disabled</li>
                        <li>Out of Town on Election Day</li>
                        <li>First Responder</li>
                        <li>Confined, awaiting trial</li>
                        <li>Student away at college</li>
                        <li>See other reasons <a href="" target="absentee-reasons">here</a></li>
                      </ul>
                  </Aux>
                )
              }
            </section>

            <hr />

            <section>
              <h2 className="text-right secondary-text-color"><i>TIME TO GET OUT THE VOTE!!</i></h2>
              <h2>Volunteer</h2>
            </section>

            <hr />

            <h2 className="text-right secondary-text-color"><i>DEMOCRACY’S ONLY HOPE!</i></h2>

          </div>
        </div>
      </article>
    );
  }
}

export default TakeAction;
