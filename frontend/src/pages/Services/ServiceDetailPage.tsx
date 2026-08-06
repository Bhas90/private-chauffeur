import { Navigate, useParams } from "react-router-dom";
import { FiCheck, FiCheckCircle } from "react-icons/fi";

import TailoredQuoteForm from "../../components/forms/TailoredQuoteForm";
import InnerPageHero from "../../components/hero/InnerPageHero";
import ServiceSidebar from "../../components/sidebar/ServiceSidebar";
import { servicesData } from "../../data/servicesData";
import "./serviceDetailPage.css";

export default function ServiceDetailPage() {
  const { slug } = useParams();

  const service = servicesData.find((item) => item.slug === slug);

  if (!service) {
    return <Navigate replace to="/services" />;
  }

  return (
    <main>
      <InnerPageHero
        eyebrow={service.eyebrow}
        title={service.title}
        description={service.heroDescription}
        image={service.image}
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Services", path: "/services" },
          { label: service.shortTitle },
        ]}
      />

      <section className="service-detail">
        <div className="container service-detail__layout">
          <ServiceSidebar />

          <div className="service-detail__content">
            <div className="service-detail__intro">
              <span>Private Chauffeur Melbourne</span>

              <h2>{service.title}</h2>

              <p>{service.shortDescription}</p>
            </div>

            <div className="service-detail__benefits">
              {service.benefits.map((benefit) => (
                <div key={benefit}>
                  <FiCheckCircle />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {service.sections.map((section) => (
              <section
                className="service-detail__section"
                key={section.title}
              >
                <h2>{section.title}</h2>

                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}

                {section.points && (
                  <ul>
                    {section.points.map((point) => (
                      <li key={point}>
                        <FiCheck />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <section className="service-detail__vehicles">
              <span>Recommended Fleet</span>

              <h2>Suitable vehicles for this service</h2>

              <div>
                {service.suitableVehicles.map((vehicle) => (
                  <article key={vehicle}>{vehicle}</article>
                ))}
              </div>
            </section>

            <section className="service-detail__faqs">
              <span>Service FAQs</span>

              <h2>Frequently asked questions</h2>

              <div>
                {service.faqs.map((faq) => (
                  <article key={faq.question}>
                    <h3>{faq.question}</h3>
                    <p>{faq.answer}</p>
                  </article>
                ))}
              </div>
            </section>

            <TailoredQuoteForm defaultService={service.slug} />
          </div>
        </div>
      </section>
    </main>
  );
}