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
    });

    it("should navigate to InvoicePayments", () => {
      const params = {
        lang: 'es-MX', customerId: 'cust-01', invoiceId: 'INV009'
      };
      const url = navigate.to.InvoicePayments(params, false);
      expect(url).to.equals('/es-MX/customer/cust-01/invoices/INV009/payments');
    });

    it("should navigate by default to root `/`", () => {
      navigate.to();
      expect(push.calledWith("/")).to.equals(true)
    });
  });

  describe("from > to", () => {
    describe("from ProfileDetails", () => {
      const { to } = navigate.from.ProfileDetails;
      beforeEach(() => history.location.pathname = "/profiles/1234");
      
      it("should navigate from Profiles to ProfileDetails", () => {
        const url = to.ProfileEdit({}, false);
        expect(url).to.equals("/profiles/1234/edit")
      });

      it("should navigate from `/profiles` to `/profiles/new`", () => {
        const url = to.ProfileNew();
        expect(url).to.equals("/profiles/new");
        expect(push.calledOnce).to.equals(true);
        expect(push.calledWith("/profiles/new")).to.equals(true);
      });

      it("should navigate to Home", () => {
        const url = to.Home();
        expect(url).to.equals("/");
        expect(push.calledOnce).to.equals(true);
        expect(push.calledWith("/")).to.equals(true);
      });
    });

    describe("From InvoicePayments", () => {
      const paymentsUrl = "/es-MX/customer/cust-01/invoices/INV009/payments";
      
      beforeEach(() => history.location.pathname = paymentsUrl);

      it("should navigate to CustomerAddresses", () => {
        const url = navigate.from.InvoicePayments.to.CustomerAddresses({}, false);
        expect(url).to.equals("/es-MX/customer/cust-01/addresses");
      });
    });
  });

  describe("replace >", () => {
    const { replace } = navigate;
    const paymentsUrl = "/es-MX/customer/cust-01/invoices/INV009/payments";
    
    beforeEach(() => history.location.pathname = paymentsUrl);

    it("should replace language", () => {
      const url = replace.InvoicePayments({ lang: 'en-us'}, false);
      expect(url).to.equals("/en-us/customer/cust-01/invoices/INV009/payments");
    });

    it("should replace invoiceId", () => {
      const url = replace.InvoicePayments({ invoiceId: 'INV088'}, false);
      expect(url).to.equals("/es-MX/customer/cust-01/invoices/INV088/payments");
    });
  });

  describe("isPath > ", () => {
    const { isPath } = navigate;

    it("should match ProfileEdit", () => {
      expect(isPath.ProfileEdit("/profiles/4/edit")).to.equals(true);
      expect(isPath.ProfileEdit.exact("/profiles/4/edit")).to.equals(true);
    });

    it("should match Profiles index", () => {
      expect(isPath.Profiles("/profiles/4/edit")).to.equals(true);
    });

    it("should not exact match Profiles index", () => {
      expect(isPath.Profiles("/profiles/4/edit", { exact: true })).to.equals(false);
      expect(isPath.Profiles.exact("/profiles/4/edit")).to.equals(false);
    });    

    it("should not mactch ProfileNew", () => {
      expect(isPath.ProfileNew("/profiles/4/edit")).to.equals(false);
    })
  });

  describe("> clearHash", () => {
    beforeEach(() => {
      history.location = { pathname: '/aboutUs', hash: 'people'};
      navigate.clearHash();
    });

    it("should set hash to null", () => {
      const arg = push.getCall(0).args[0];
      expect(push.calledOnce).to.equals(true);
      expect(arg.pathname).to.equals("/aboutUs");
      expect(arg.hash).to.equals(null);
    })
  });

  describe("> isActive", () => {
    const { isActive } = navigate;

    beforeEach(() => history.location.pathname = "/profiles/5/edit");
    
    it("should match Profiles index", () => {
      expect(isActive("/profiles")).to.equals(true);
    });

    it("should match ProfileDetails", () => {
      expect(isActive("/profiles/5")).to.equals(true);
    });

    it("should match ProfileDetails", () => {
      expect(isActive("/profiles/5/edit")).to.equals(true);
    });

    it("should NOT match exact Profiles index", () => {
      expect(isActive.exact("/profiles")).to.equals(false);
    });

    it("should NOT match ProfileDetails", () => {
      expect(isActive.exact("/profiles/5")).to.equals(false);
    });
  });
});