import React, { useState, useEffect } from "react";
import {
  getUserDetails,
  setUserDetails as changeUserDetails,
} from "../../utils/api";

function UserForm({ walletAddress }) {
  const [userDetails, setUserDetails] = useState({
    fullname: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
  });

  // Handles the submit event on form submit.
  const handleSubmit = async (event) => {
    event.preventDefault();

    // const JSONdata = JSON.stringify(userDetails);
    // console.log(JSONdata);

    changeUserDetails(walletAddress, userDetails).then((r) => console.log(r));
  };

  useEffect(() => {
    getUserDetails(walletAddress).then((res) => {
      setUserDetails({
        ...userDetails,
        ...res.data,
      });
    });
  }, [walletAddress]);

  return (
    <form className="container" onSubmit={handleSubmit}>
      <h1>Let us know yourself!</h1>
      <div className="block phone">
        {/* <label htmlFor="fullname">Fullname</label> */}
        <input
          id="fullname"
          placeholder="Fullname"
          type="text"
          name="fullname"
          autoComplete="fullname"
          value={userDetails.fullname}
          onChange={(evt) =>
            setUserDetails({
              ...userDetails,
              fullname: evt.target.value,
            })
          }
          required
        />
      </div>
      <div className="name block">
        <div>
          {/* <label htmlFor="street1">Street</label> */}
          <input
            id="street1"
            placeholder="Street 1"
            type="text"
            name="street1"
            autoComplete="street1"
            value={userDetails.street1}
            onChange={(evt) =>
              setUserDetails({
                ...userDetails,
                street1: evt.target.value,
              })
            }
            required
          />
        </div>
        <div>
          <input
            id="street2"
            placeholder="Street 2"
            type="text"
            name="street2"
            autoComplete="street2"
            value={userDetails.street2}
            onChange={(evt) =>
              setUserDetails({
                ...userDetails,
                street2: evt.target.value,
              })
            }
            required
          />
        </div>
      </div>

      <div className="name block">
        <div>
          {/* <label htmlFor="city">City</label> */}
          <input
            id="city"
            placeholder="City"
            type="text"
            name="city"
            autoComplete="city"
            value={userDetails.city}
            onChange={(evt) =>
              setUserDetails({
                ...userDetails,
                city: evt.target.value,
              })
            }
            required
          />
        </div>
        <div>
          {/* <label htmlFor="state">State</label> */}
          <input
            id="state"
            placeholder="State"
            type="text"
            name="state"
            autoComplete="state"
            value={userDetails.state}
            onChange={(evt) =>
              setUserDetails({
                ...userDetails,
                state: evt.target.value,
              })
            }
            required
          />
        </div>
      </div>

      <div className="name block">
        <div>
          {/* <label htmlFor="country">Country</label> */}
          <input
            id="country"
            placeholder="Country"
            type="text"
            name="country"
            autoComplete="country"
            value={userDetails.country}
            onChange={(evt) =>
              setUserDetails({
                ...userDetails,
                country: evt.target.value,
              })
            }
            required
          />
        </div>
        <div>
          {/* <label htmlFor="zipcode">Zip Code</label> */}
          <input
            id="zipcode"
            placeholder="Zipcode"
            type="text"
            name="zipcode"
            autoComplete="zipcode"
            value={userDetails.zipcode}
            onChange={(evt) =>
              setUserDetails({
                ...userDetails,
                zipcode: evt.target.value,
              })
            }
            required
          />
        </div>
      </div>

      <div className="button block">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default UserForm;
