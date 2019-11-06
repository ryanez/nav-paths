import { expect } from 'chai';
import simon from 'sinon';
import createNavigate from './nav-paths';
import * as Paths from './paths';

const push = simon.stub();
const history = { push, location: { pathname: '/' } };
const navigate = createNavigate(history, Paths);

describe("nav-paths >", () => {
  beforeEach(() => push.resetHistory());

  describe("to >", () => {
    it("should navigate to `/about-us` page.", () => {
      navigate.to.AboutUs({});
      expect(push.calledOnce).to.equals(true)
      expect(push.calledWith("/about-us")).to.equals(true)
    });

    it("should generate link without navigation", () => {
      const url = navigate.to.ProfileDetails({profileId: 'abcd'}, false);
      expect(push.calledOnce).to.equals(false)
      expect(url).to.equals("/profiles/abcd")
    })
  });

  describe("from > to", () => {
    const { to } = navigate.from.ProfileDetails;
    beforeEach(() => history.location.pathname = "/profiles/1234");
    
    it("should navigate from Profiles to ProfileDetails", () => {
      const url = to.ProfileEdit({}, false);
      expect(url).to.equals("/profiles/1234/edit")
    });

    it("shodule navigate to ProfileNew", () => {
      const url = to.ProfileNew();
      expect(url).to.equals("/profiles/new");
      expect(push.calledOnce).to.equals(true);
      expect(push.calledWith("/profiles/new")).to.equals(true);
    });

    it("shodule navigate to Home", () => {
      const url = to.Home();
      expect(url).to.equals("/");
      expect(push.calledOnce).to.equals(true);
      expect(push.calledWith("/")).to.equals(true);
    });
  });

// TODO: 
// - isPath
// - clearHash
// - isActive
});