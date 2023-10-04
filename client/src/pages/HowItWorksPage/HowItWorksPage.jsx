import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import HowItWorks from '../../components/HowItWorks/HowItWorks';
import style from "./style.module.scss"
export default function HowItWorksPage() {
  return (
    <div className={style.container}>
      <Header />
      <HowItWorks />
      <Footer />
    </div>
  );
}
