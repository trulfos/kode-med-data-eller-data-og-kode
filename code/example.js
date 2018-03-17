const InsuranceForm = () => (
    <SuperForm id="order-form">
        <h1>Bestill forsikring</h1>;

        <label for="name">Navn</label>
        <input type="text" id="name" name="name" />

        <label for="phone">Telefonnummer</label>
        <input type="tel" id="phone" name="phone" />

        <label for="object">Forsikringsobjekt</label>
        <input type="text" id="object" name="object" />
    </SuperForm>
);

const ClaimForm = () => (
    <BadForm id="claim-form">
        <h1>Meld skade</h1>

        <label for="object">Forsikringsobjekt</label>
        <input type="text" id="object" name="object" />

        <label for="what">Hva skjedde?</label>
        <input type="text" id="what" name="what" />

        <label for="why">Hvorfor skjedde det?</label>
        <input type="text" id="why" name="why" />
    </BadForm>
);

const CreditCardInsuranceForm = () => (
    <MediocreForm id="order-card-insurance-form">
        <h1>Bestill kredittkortforsikring</h1>;

        <label for="name">Kortholders navn</label>
        <input type="text" id="name" name="name" />

        <label for="card_number">Kortnummer</label>
        <input type="text" id="card_number" name="card_number" />

        <label for="expiry">Utløpsdato</label>
        <input type="text" id="expiry" name="expiry" />
    </MediocreForm>
);

const InsuranceInsuranceForm = () => (
    <OldForm id="order-insurance-insurance">
        <h1>Bestill forsikringforsikring</h1>;

        <label for="name">Forsikringens forsikringsselskap</label>
        <input type="text" id="name" name="name" />

        <label for="amount">Forsikringsbeløp</label>
        <input type="number" id="amount" name="amount" />
    </OldForm>
);
