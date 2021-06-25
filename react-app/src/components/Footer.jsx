import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

export default function Footer() {
  return (
    <div className="NavBar Footer">
      <div className="footerBox">
        <div className="footerTitle">Repo</div>
        <div className="footerLinks">

        <a
          className="footerLink"
          href="https://github.com/jjiiaaLi/EtsyWishList"
          >
          Github
        </a>
      </div>
            </div>
      <div className="footerBox">
        <div className="footerTitle">John Witter</div>
        <div className="footerLinks">
          <a className="footerLink" href="https://github.com/John-Witter">
            Github
          </a>
          <a
            className="footerLink"
            href="https://www.linkedin.com/in/john-witter-witlacil-556a3b158/"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <div className="footerBox">
        <div className="footerTitle">Kevin Tran</div>
        <div className="footerLinks">
          <a className="footerLink" href="https://github.com/kevin-tran12">
            Github
          </a>
          <a
            className="footerLink"
            href="https://www.linkedin.com/in/kevin-tran-059926124/"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <div className="footerBox">
        <div className="footerTitle">James Mayfield</div>
        <div className="footerLinks">
          <a
            className="footerLink"
            href="https://static.miraheze.org/ficreationwiki/b/b4/Donkey_%28Shrek_2%29.png"
          >
            Github
          </a>
          <a className="footerLink" href="https://i.redd.it/1vjxppzccfo41.jpg">
            LinkedIn
          </a>
        </div>
      </div>

      <div className="footerBox">
        <div className="footerTitle">Jia Li</div>
        <div className="footerLinks">

        <a className="footerLink" href="https://github.com/jjiiaaLi">
          Github
        </a>
        <a
          className="footerLink"
          href="https://www.linkedin.com/in/jia-li-2829b140/"
          >
          LinkedIn
        </a>
        </div>
      </div>
    </div>
  );
}
