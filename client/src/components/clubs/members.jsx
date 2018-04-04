import React from 'react';

class Members extends React.Component {
constructor(props) {
  super(props);
  this.state = {
    memberList: [
      {name: "Katerina Haus", profile_url: "gdKNGWKoxsU"},
      {name: "Timothy Bartley", profile_url: "6anudmpILw4"},
      {name: "Betty Anderson", profile_url: "2z87shqF8Fo"},
      {name: "Anita Aurelia", profile_url: "mEZ3PoFGs_k"}
    ]
  }
  this.getClubMembers = this.getClubMembers.bind(this);
}

componentDidMount() {
  let clubId = this.props.club.id;
  this.getClubMembers(clubId)
}

getClubMembers(clubId) {
    const query = `mutation getClubMembers($clubId: String) {
      getClubMembers(clubId: $clubId)
    }`;
    $.ajax({
      type: 'POST',
      url: '/graphql',
      contentType: 'application/json',
      data: JSON.stringify({
        query,
        variables: {
          clubId,
        },
      }),
      success: (data) => {
        console.log('success');
        // this.setState({
        //   memberList: data
        // });
      },
      error: (data) => {
        console.log(data);
      },
    });
  }

  render() {
    return (
      <div className="row">
        { this.state.memberList.map(member =>
          (
            <div key={member.profile_url} className="col-md-6 content-panel">
              <img src={`https://source.unsplash.com/${member.profile_url}`} className="img-circle" />
              <h5 className="user">{member.name}</h5>
            </div>
          )
        )}
      </div>
    )
  }
}

export default Members;

