<template>
    <section id="lab_pricing_table">
  <div class="container">
    <div class="row">
      <div class="pricing-tables attached">
        <div class="row">
          <div class="col-sm-4 col-md-4">
            <div class="plan first">
              <div class="head">
                <h2>Starter</h2>
              </div>
              <ul class="item-list">
                <li><strong>20GB</strong> Storage</li>
                <li>
                  <strong>15</strong> Email Addresses</li>
                <li><strong>5</strong> Domains </li>
                <li><strong>Endless</strong> Support</li>
              </ul>
              <div class="price">
                <h3><span class="symbol">$</span>19</h3>
                <h4>per month</h4>
              </div>
              <button type="button" class="btn btn-success">Sign Up</button>
            </div>
          </div>
          <div class="col-sm-4 col-md-4 ">
            <div class="plan recommended">
              <div class="head">
                <h2>Value</h2>
              </div>
              <ul class="item-list">
                <li><strong>50GB</strong> Storage</li>
                <li><strong>25</strong> Email Addresses</li>
                <li><strong>15</strong> Domains</li>
                <li><strong>Endless</strong> Support</li>
              </ul>
              <div class="price">
                <h3><span class="symbol">$</span>29</h3>
                <h4>per month</h4>
              </div>
              <button type="button" class="btn btn-success">Sign Up</button>
            </div>
          </div>
          <div class="col-sm-4 col-md-4  ">
            <div class="plan last">
              <div class="head">
                <h2>Pro</h2>
              </div>
              <ul class="item-list">
                <li><strong>100GB </strong>Storage</li>
                <li><strong>50 </strong>Email Addresses</li>
                <li><strong>25</strong> Domains</li>
                <li><strong>Endless</strong> Support</li>
              </ul>
              <div class="price">
                <h3><span class="symbol">$</span>49</h3>
                <h4>per month</h4>
              </div>
              <button type="button" class="btn btn-success">Sign Up</button>
            </div>
          </div>
        </div>
        <!-- end .row -->
      </div>
      <!-- end .pricing-tables -->
    </div>
  </div>
</section>
</template>
<style>
#lab_pricing_table {
  background: #eee;
  padding: 15px;
}

#lab_pricing_table .navbar {
  box-shadow: 0 2px 2px rgba(10, 10, 10, 0.06);
  -moz-box-shadow: 0 2px 2px rgba(10, 10, 10, 0.06);
  -webkit-box-shadow: 0 2px 2px rgba(10, 10, 10, 0.06);
  border: none;
  background: #fff;
}

#lab_pricing_table .navbar ul > li > a {
  font-weight: 600;
  padding: 26px;
  color: #434a54;
  font-size: 12px;
  text-transform: uppercase;
}

#lab_pricing_table .navbar .container .navbar-brand {
  margin-left: 0px;
  padding: 25px;
}

#lab_pricing_table .main-title {
  text-align: center;
}

#lab_pricing_table .pricing-tables {
  padding: 20px;
  max-width: 90%;
  margin: 0 auto;
}

#lab_pricing_table .pricing-tables h1 {
  font-size: 48px;
}

#lab_pricing_table .pricing-tables .plan.first {
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
}

#lab_pricing_table .pricing-tables .plan.last {
  border-bottom-right-radius: 4px;
  border-top-right-radius: 4px;
}

#lab_pricing_table .pricing-tables .plan.recommended {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}

#lab_pricing_table .pricing-tables .plan.recommended .head {
  margin-bottom: 20px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

#lab_pricing_table .pricing-tables.attached .col-sm-4,
#lab_pricing_table .pricing-tables.attached .col-md-4,
#lab_pricing_table .pricing-tables.attached .col-sm-3,
#lab_pricing_table .pricing-tables.attached .col-md-3 {
  padding-left: 0;
  padding-right: 0;
}

#lab_pricing_table .pricing-tables.attached .plan {
  border-radius: 0;
}

#lab_pricing_table .pricing-tables.attached .plan .head {
  border-radius: 0;
}

#lab_pricing_table .pricing-tables.attached .plan.recommended {
  border-radius: 4px;
}

#lab_pricing_table .pricing-tables.attached .plan.recommended .head {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

#lab_pricing_table .pricing-tables.attached .plan.last {
  border-bottom-right-radius: 4px;
}

#lab_pricing_table .pricing-tables.attached .plan.last .head {
  border-top-right-radius: 4px;
}

#lab_pricing_table .pricing-tables.attached .plan.first {
  border-bottom-left-radius: 4px;
}

#lab_pricing_table .pricing-tables.attached .plan.first .head {
  border-top-left-radius: 4px;
}

#lab_pricing_table .plan {
  box-shadow: 0 2px 2px rgba(10, 10, 10, 0.06);
  min-height: 100px;
  background: #fff;
  border-radius: 4px;
  margin: 20px 0;
  padding-bottom: 25px;
  text-align: center;
}

#lab_pricing_table .plan .head {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  padding: 12px 16px;
  background: #1c1c1c;
  color: #fff;
}

#lab_pricing_table .plan .head h1,
#lab_pricing_table .plan .head h2,
#lab_pricing_table .plan .head h3 {
  padding: 0;
  margin: 0;
  font-weight: 100;
}

#lab_pricing_table .plan .price {
  border-top: 1px solid #eee;
  margin: 0 auto 30px auto;
  width: 80%;
}

#lab_pricing_table .plan .price h3 {
  font-size: 82px;
  vertical-align: top;
  line-height: 1;
}

#lab_pricing_table .plan .price h3 span {
  font-size: 38px;
  vertical-align: top;
  position: relative;
  margin: 6px 0 0 -7px;
  display: inline-block;
}

#lab_pricing_table .plan .price h4 {
  color: #aaa;
  font-size: 14px;
}

#lab_pricing_table .plan .btn {
  padding: 10px 30px;
  text-transform: uppercase;
  font-weight: 500;
}

#lab_pricing_table .plan ul {
  list-style-type: none;
  padding: 20px;
  margin-top: 2px;
}

#lab_pricing_table .plan ul li {
  line-height: 22px;
  margin-bottom: 15px;
  font-size: 14px;
  font-weight: 400;
}

#lab_pricing_table .plan ul li a {
  text-decoration: underline;
  color: #e6e9ed;
}

#lab_pricing_table .plan ul li:last-child {
  border-bottom: none;
}

#lab_pricing_table .plan ul strong {
  font-weight: 700;
}

#lab_pricing_table .plan.recommended {
  margin-top: 6px;
  box-shadow: 0 0 22px rgba(10, 10, 10, 0.42);
  position: relative;
  z-index: 99;
  border-radius: 4px;
}

#lab_pricing_table .plan.recommended .head {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background: #171717;
}

#lab_pricing_table .plan.recommended .btn {
  margin-bottom: 10px;
}
</style>
