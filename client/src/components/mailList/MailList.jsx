import "./mailList.css"

const MailList = () => {
  return (
    <div className="mail">
      <h1 className="mailTitle">Make Your, Hustle To Find A Good Paying Guest Easy With Us!</h1>
      <span className="mailDesc">Sign up and we'll send the best PG Accomodation  to you by your preferred location</span>
      <div className="mailInputContainer">
        <input type="text" placeholder="Your Email" />
        <button>Subscribe</button>
      </div>
    </div>
  )
}

export default MailList