<?php require 'header.php'; ?>
<?php require 'menu.php'; ?>

<!-- partial -->
<div class="main-panel">
    <div class="content-wrapper">
        <div class="row">
            <div class="col-md-12 grid-margin">
                <div class="d-flex justify-content-between flex-wrap">
                    <div class="d-flex align-items-center dashboard-header flex-wrap mb-3 mb-sm-0">
                        <h5 class="mr-4 mb-0 font-weight-bold">Dashboard</h5>
                        <div class="d-flex align-items-baseline dashboard-breadcrumb">
                            <p class="mb-0 mr-1 hover-cursor">App</p>
                            <i class="mdi mdi-chevron-right mr-1"></i>
                            <p class="mb-0 mr-1 hover-cursor">Dashboard</p>
                            <i class="mdi mdi-chevron-right mr-1"></i>
                            <p class="mb-0 hover-cursor">Analytics</p>
                        </div>
                    </div>
                    <div class="d-flex">
                        <div class="btn-group mr-3">
                            <button type="button" class="btn btn-primary">02 Aug 2019</button>
                            <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" id="dropdownMenuSplitButton1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="sr-only">Toggle Dropdown</span>
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuSplitButton1">
                                <a class="dropdown-item" href="#">Sept 2019</a>
                                <a class="dropdown-item" href="#">Oct 2019</a>
                                <a class="dropdown-item" href="#">Nov 2019</a>
                            </div>
                        </div>
                        <button class="btn btn-light border d-none d-sm-block">Download Report</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-sm-6 col-md-3 grid-margin stretch-card">
                <div class="card icon-card-primary">
                    <div class="card-body">
                        <div class="d-flex align-items-center">
                            <div class="icon mb-0 mb-md-2 mb-xl-0 mr-2">
                                <i class="mdi mdi-star-circle"></i>
                            </div>
                            <p class="font-weight-medium mb-0">Sales</p>
                        </div>
                        <div class="d-flex align-items-center mt-3 flex-wrap">
                            <h3 class="font-weight-medium mb-0 mr-2">59467</h3>
                            <div class="badge badge-outline-light badge-pill mt-md-2 mt-xl-0">
                                <div class="d-flex align-items-baseline">
                                    <span class="mr-2">High</span>
                                    <span class="mb-0">311</span>
                                    <span class="mdi mdi-arrow-up"></span>
                                </div>
                            </div>
                        </div>
                        <small class="d-block mt-2">Total for this month</small>
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-6 col-md-3 grid-margin stretch-card">
                <div class="card icon-card-success">
                    <div class="card-body">
                        <div class="d-flex align-items-center">
                            <div class="icon mb-0 mb-md-2 mb-xl-0 mr-2">
                                <i class="mdi mdi-truck"></i>
                            </div>
                            <p class="font-weight-medium mb-0">Returns</p>
                        </div>
                        <div class="d-flex align-items-center mt-3 flex-wrap">
                            <h3 class="font-weight-medium mb-0 mr-2">28085</h3>
                            <div class="badge badge-outline-light badge-pill mt-md-2 mt-xl-0">
                                <div class="d-flex align-items-baseline">
                                    <span class="mr-2">High</span>
                                    <span class="mb-0">2.98</span>
                                    <span class="mdi mdi-arrow-up"></span>
                                </div>
                            </div>
                        </div>
                        <small class="d-block mt-2">Total for this month</small>
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-6 col-md-3 grid-margin stretch-card">
                <div class="card icon-card-info">
                    <div class="card-body">
                        <div class="d-flex align-items-center">
                            <div class="icon mb-0 mb-md-2 mb-xl-0 mr-2">
                                <i class="mdi mdi-basket"></i>
                            </div>
                            <p class="font-weight-medium mb-0">Purchases</p>
                        </div>
                        <div class="d-flex align-items-center mt-3 flex-wrap">
                            <h3 class="font-weight-medium mb-0 mr-2">39645</h3>
                            <div class="badge badge-outline-light badge-pill mt-md-2 mt-xl-0">
                                <div class="d-flex align-items-baseline">
                                    <span class="mr-2">Low</span>
                                    <span class="mb-0">0.21</span>
                                    <span class="mdi mdi-arrow-down"></span>
                                </div>
                            </div>
                        </div>
                        <small class="d-block mt-2">Total for this month</small>
                    </div>
                </div>
            </div>
            <div class="col-12 col-sm-6 col-md-3 grid-margin stretch-card">
                <div class="card icon-card-dark">
                    <div class="card-body">
                        <div class="d-flex align-items-center">
                            <div class="icon mb-0 mb-md-2 mb-xl-0 mr-2">
                                <i class="mdi mdi-package-down"></i>
                            </div>
                            <p class="font-weight-medium mb-0">Downloads</p>
                        </div>
                        <div class="d-flex align-items-center mt-3 flex-wrap">
                            <h3 class="font-weight-medium mb-0 mr-2">44148</h3>
                            <div class="badge badge-outline-light badge-pill mt-md-2 mt-xl-0">
                                <div class="d-flex align-items-baseline">
                                    <span class="mr-2">Low</span>
                                    <span class="mb-0">1.12</span>
                                    <span class="mdi mdi-arrow-down"></span>
                                </div>
                            </div>
                        </div>
                        <small class="d-block mt-2">Total for this month</small>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex align-items-start justify-content-between">
                            <p class="card-title">Customers</p>
                            <div class="dropdown dropright card-menu-dropdown">
                                <button class="btn" type="button" id="cardMenuButton1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="mdi mdi-dots-horizontal card-menu-btn"></i>
                                </button>
                                <div class="dropdown-menu" aria-labelledby="cardMenuButton1">
                                    <a class="dropdown-item" href="#">Action</a>
                                    <a class="dropdown-item" href="#">Another action</a>
                                    <a class="dropdown-item" href="#">Something else here</a>
                                </div>
                            </div>
                        </div>
                        <p class=" mb-5">Total customers this month</p>
                        <div class="d-flex flex-column justify-content-center align-items-center">
                            <h1 class="font-weight-normal text-white">92556</h1>
                            <div class="d-flex align-items-baseline flex-wrap justify-content-center">
                                <h5 class="mb-0 font-weight-normal text-success">1.35</h5>
                                <i class="mdi mdi-arrow-up text-success mr-1"></i>
                                <h5 class="mb-0 mt-0 mt-md-2 mt-xl-0 font-weight-normal">More than last month</h5>
                            </div>
                        </div>
                    </div>
                    <canvas height="110" id="customers-chart"></canvas>
                </div>
            </div>
            <div class="col-md-4 grid-margin stretch-card">
                <div class="card overflow-hidden">
                    <div class="card-body">
                        <div class="d-flex align-items-start justify-content-between">
                            <p class="card-title">Conversion</p>
                            <div class="dropdown dropleft card-menu-dropdown">
                                <button class="btn" type="button" id="cardMenuButton2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="mdi mdi-dots-horizontal card-menu-btn"></i>
                                </button>
                                <div class="dropdown-menu" aria-labelledby="cardMenuButton2">
                                    <a class="dropdown-item" href="#">Action</a>
                                    <a class="dropdown-item" href="#">Another action</a>
                                    <a class="dropdown-item" href="#">Something else here</a>
                                </div>
                            </div>
                        </div>
                        <p class=" mb-5">Total conversion this month</p>
                        <div class="d-flex flex-column justify-content-center align-items-center">
                            <h1 class="font-weight-normal text-white">53812</h1>
                            <div class="d-flex align-items-baseline flex-wrap justify-content-center">
                                <h5 class="mb-0 font-weight-normal text-danger">0.17</h5>
                                <i class="mdi mdi-arrow-down text-danger mr-1"></i>
                                <h5 class="mb-0 mt-0 mt-md-2 mt-xl-0 font-weight-normal">Less than last month</h5>
                            </div>
                        </div>
                    </div>
                    <canvas height="110" id="conversion-chart"></canvas>
                </div>
            </div>
            <div class="col-md-4 grid-margin stretch-card">
                <div class="card overflow-hidden">
                    <div class="card-body">
                        <div class="d-flex align-items-start justify-content-between">
                            <p class="card-title">Revenue</p>
                            <div class="dropdown dropright card-menu-dropdown">
                                <button class="btn" type="button" id="cardMenuButton3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="mdi mdi-dots-horizontal card-menu-btn"></i>
                                </button>
                                <div class="dropdown-menu" aria-labelledby="cardMenuButton3">
                                    <a class="dropdown-item" href="#">Action</a>
                                    <a class="dropdown-item" href="#">Another action</a>
                                    <a class="dropdown-item" href="#">Something else here</a>
                                </div>
                            </div>
                        </div>
                        <p class=" mb-5">Total revenue this month</p>
                        <div class="d-flex flex-column justify-content-center align-items-center">
                            <h1 class="font-weight-normal text-white">40008</h1>
                            <div class="d-flex align-items-baseline flex-wrap justify-content-center">
                                <h5 class="mb-0 font-weight-normal text-success">0.06</h5>
                                <i class="mdi mdi-arrow-up text-success mr-1"></i>
                                <h5 class="mb-0 mt-0 mt-md-2 mt-xl-0 font-weight-normal">Less than last month</h5>
                            </div>
                        </div>
                    </div>
                    <canvas height="110" id="revenue-chart-dark"></canvas>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-8 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex align-items-start justify-content-between">
                            <p class="card-title flex-grow">Revenue for Last 30 days</p>
                            <div class="d-flex align-items-center">
                                <div class="dropdown dropright card-menu-dropdown">
                                    <button class="btn" type="button" id="cardMenuButton4" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="mdi mdi-dots-horizontal card-menu-btn"></i>
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="cardMenuButton4">
                                        <a class="dropdown-item" href="#">Action</a>
                                        <a class="dropdown-item" href="#">Another action</a>
                                        <a class="dropdown-item" href="#">Something else here</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-start flex-wrap ">
                            <p class=" mb-0">Sales Performance for Online revenue of past 30 days</p>
                            <div class="online-revenue-chart-legend mt-2 mt-sm-0 mt-md-2 mt-xl-0 mr-1" id="online-revenue-legend"></div>
                        </div>
                        <canvas id="online-revenue-chart-dark"></canvas>
                    </div>
                </div>
            </div>
            <div class="col-md-4 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex align-items-start justify-content-between">
                            <p class="card-title flex-grow">all online sales</p>
                            <div class="dropdown dropright card-menu-dropdown">
                                <button class="btn" type="button" id="cardMenuButton5" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="mdi mdi-dots-horizontal card-menu-btn"></i>
                                </button>
                                <div class="dropdown-menu" aria-labelledby="cardMenuButton5">
                                    <a class="dropdown-item" href="#">Action</a>
                                    <a class="dropdown-item" href="#">Another action</a>
                                    <a class="dropdown-item" href="#">Something else here</a>
                                </div>
                            </div>
                        </div>
                        <p class="">The total number of sessions within the date range. It is the period time a user is actively engaged with your website, page or app, etc. </p>
                        <canvas id="online-sales-chart" class="mt-5 mt-md-4 mt-xl-5"></canvas>
                        <div class="d-flex d-md-none d-xl-flex justify-content-between mt-5 mx-2">
                            <div class="d-flex flex-column align-items-center">
                                <h3 class="font-weight-bold text-white">12%</h3>
                                <small>Sales total</small>
                            </div>
                            <div class="d-flex flex-column align-items-center">
                                <h3 class="font-weight-bold text-white">20%</h3>
                                <small>Sales total</small>
                            </div>
                            <div class="d-flex flex-column align-items-center">
                                <h3 class="font-weight-bold text-white">67%</h3>
                                <small>Sales total</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-7 col-xl-8 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex align-items-start justify-content-between">
                            <p class="card-title flex-grow">market overview</p>
                            <div class="dropdown dropright card-menu-dropdown">
                                <button class="btn" type="button" id="cardMenuButton6" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="mdi mdi-dots-horizontal card-menu-btn"></i>
                                </button>
                                <div class="dropdown-menu" aria-labelledby="cardMenuButton6">
                                    <a class="dropdown-item" href="#">Action</a>
                                    <a class="dropdown-item" href="#">Another action</a>
                                    <a class="dropdown-item" href="#">Something else here</a>
                                </div>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th class="pl-0 pt-0">Product</th>
                                        <th class="pt-0">Type</th>
                                        <th class="pt-0">SKU</th>
                                        <th class="pt-0">Quantity</th>
                                        <th class="pt-0">Amount</th>
                                        <th class="pr-0 pt-0">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="pl-0">
                                            <div class="d-flex">
                                                <div class="icon-rounded-success mr-3">
                                                    <i class="mdi mdi-check"></i>
                                                </div>
                                                <div>
                                                    WMQ96921
                                                    <p class="smaller-text mb-0 mt-2 ">18 Sep 2019</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>#ABU81275</td>
                                        <td>931</td>
                                        <td>8</td>
                                        <td>14689</td>
                                        <td class="pr-0">
                                            <div class="d-flex justify-content-between align-items-center">
                                                <label class="badge badge-outline-success mr-4 mr-xl-2">Completed</label>
                                                <div class="icon-square-sm-danger hover-cursor">
                                                    <i class="mdi mdi-delete"></i>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="pl-0">
                                            <div class="d-flex">
                                                <div class="icon-rounded-danger mr-3">
                                                    <i class="mdi mdi-close"></i>
                                                </div>
                                                <div>
                                                    WMQ60538
                                                    <p class="smaller-text mb-0 mt-2 ">29 May 2019</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>#HGA55521</td>
                                        <td>828</td>
                                        <td>37</td>
                                        <td>19888</td>
                                        <td class="pr-0">
                                            <div class="d-flex justify-content-between align-items-center">
                                                <label class="badge badge-outline-danger mr-4 mr-xl-2">Cancelled</label>
                                                <div class="icon-square-sm-danger hover-cursor">
                                                    <i class="mdi mdi-delete"></i>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="pl-0">
                                            <div class="d-flex">
                                                <div class="icon-rounded-warning mr-3">
                                                    <i class="mdi mdi-information-outline"></i>
                                                </div>
                                                <div>
                                                    WMQ95994
                                                    <p class="smaller-text mb-0 mt-2 ">24 Jun 2019</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>#HGA99169</td>
                                        <td>340</td>
                                        <td>36</td>
                                        <td>90939</td>
                                        <td class="pr-0">
                                            <div class="d-flex justify-content-between align-items-center">
                                                <label class="badge badge-outline-warning mr-4 mr-xl-2">Delayed</label>
                                                <div class="icon-square-sm-danger hover-cursor">
                                                    <i class="mdi mdi-delete"></i>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="pl-0">
                                            <div class="d-flex">
                                                <div class="icon-rounded-warning mr-3">
                                                    <i class="mdi mdi-information-outline"></i>
                                                </div>
                                                <div>
                                                    WMQ37340
                                                    <p class="smaller-text mb-0 mt-2 ">14 Mar 2019</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>#HGA26866</td>
                                        <td>128</td>
                                        <td>7</td>
                                        <td>41198</td>
                                        <td class="pr-0">
                                            <div class="d-flex justify-content-between align-items-center">
                                                <label class="badge badge-outline-warning mr-4 mr-xl-2">Delayed</label>
                                                <div class="icon-square-sm-danger hover-cursor">
                                                    <i class="mdi mdi-delete"></i>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="pl-0">
                                            <div class="d-flex">
                                                <div class="icon-rounded-success mr-3">
                                                    <i class="mdi mdi-check"></i>
                                                </div>
                                                <div>
                                                    WMQ61947
                                                    <p class="smaller-text mb-0 mt-2 ">05 Apr 2019</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>#XCA68589</td>
                                        <td>643</td>
                                        <td>67</td>
                                        <td>68601</td>
                                        <td class="pr-0">
                                            <div class="d-flex justify-content-between align-items-center">
                                                <label class="badge badge-outline-success mr-4 mr-xl-2">Completed</label>
                                                <div class="icon-square-sm-danger hover-cursor">
                                                    <i class="mdi mdi-delete"></i>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="pl-0">
                                            <div class="d-flex">
                                                <div class="icon-rounded-success mr-3">
                                                    <i class="mdi mdi-check"></i>
                                                </div>
                                                <div>
                                                    WMQ37027
                                                    <p class="smaller-text mb-0 mt-2 ">07 Sep 2019</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td>#XCA24410</td>
                                        <td>527</td>
                                        <td>73</td>
                                        <td>77178</td>
                                        <td class="pr-0">
                                            <div class="d-flex justify-content-between align-items-center">
                                                <label class="badge badge-outline-success mr-4 mr-xl-2">Completed</label>
                                                <div class="icon-square-sm-danger hover-cursor">
                                                    <i class="mdi mdi-delete"></i>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="d-flex justify-content-between align-items-center flex-wrap">
                            <nav>
                                <ul class="pagination flex-wrap pagination-separated pagination-dark mt-3 mb-0">
                                    <li class="page-item"><a class="page-link" href="#">Prev</a></li>
                                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
                                </ul>
                            </nav>
                            <p class=" mt-3 mb-0 ml-3 ml-md-0 d-none d-md-block">Showing 6 out of 100</p>
                        </div>  
                    </div>
                </div>
            </div>
            <div class="col-md-5 col-xl-4 grid-margin stretch-card">
                <div class="card overflow-hidden">
                    <div class="card-body">
                        <div class="d-flex align-items-start justify-content-between">
                            <p class="card-title flex-grow">sales total</p>
                            <div class="dropdown dropright card-menu-dropdown">
                                <button class="btn" type="button" id="cardMenuButton7" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="mdi mdi-dots-horizontal card-menu-btn"></i>
                                </button>
                                <div class="dropdown-menu" aria-labelledby="cardMenuButton7">
                                    <a class="dropdown-item" href="#">Action</a>
                                    <a class="dropdown-item" href="#">Another action</a>
                                    <a class="dropdown-item" href="#">Something else here</a>
                                </div>
                            </div>
                        </div>
                        <h2 class="font-weight-bold text-white mb-3">$971883</h2>
                        <p class=" mb-4">The French Revolution constituted for the conscience of the dominant aristocratic class a fall from innocence, and upturning of the natural chain</p>
                        <div class="row">
                            <div class="col-md-4">
                                <h4 class="font-weight-bold text-white">400</h4>
                                <div class="progress progress-md mb-2">
                                    <div class="progress-bar bg-primary" role="progressbar" style="width: 30%" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                                <small>Sales</small>
                            </div>
                            <div class="col-md-4">
                                <h4 class="font-weight-bold text-white mt-3 mt-md-0">159</h4>
                                <div class="progress progress-md mb-2">
                                    <div class="progress-bar bg-success" role="progressbar" style="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                                <small>Orders</small>
                            </div>
                        </div>
                    </div>
                    <canvas id="total-sales-chart-dark"></canvas>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-7 grid-margin grid-margin-md-0 stretch-card">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex align-items-start justify-content-between">
                            <p class="card-title flex-grow">sales total</p>
                            <div class="dropdown dropright card-menu-dropdown">
                                <button class="btn" type="button" id="cardMenuButton8" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="mdi mdi-dots-horizontal card-menu-btn"></i>
                                </button>
                                <div class="dropdown-menu" aria-labelledby="cardMenuButton8">
                                    <a class="dropdown-item" href="#">Action</a>
                                    <a class="dropdown-item" href="#">Another action</a>
                                    <a class="dropdown-item" href="#">Something else here</a>
                                </div>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Invoice number</th>
                                        <th>Franchise</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>00980814</td>
                                        <td>West Paris</td>
                                        <td>03 Oct 2019</td>
                                        <td><label class="badge badge-success">Completed</label></td>
                                        <td>58976</td>
                                    </tr>
                                    <tr>
                                        <td>00928130</td>
                                        <td>Sincereberg</td>
                                        <td>02 Jul 2019</td>
                                        <td><label class="badge badge-warning">Delayed</label></td>
                                        <td>2379</td>
                                    </tr>
                                    <tr>
                                        <td>00990867</td>
                                        <td>New Otis</td>
                                        <td>06 Sep 2019</td>
                                        <td><label class="badge badge-danger">Cancelled</label></td>
                                        <td>69432</td>
                                    </tr>
                                    <tr>
                                        <td>00983826</td>
                                        <td>Delilahfurt</td>
                                        <td>26 May 2019</td>
                                        <td><label class="badge badge-success">Completed</label></td>
                                        <td>32354</td>
                                    </tr>
                                    <tr>
                                        <td>0091820</td>
                                        <td>North Darrel</td>
                                        <td>11 Aug 2019</td>
                                        <td><label class="badge badge-success">Completed</label></td>
                                        <td>14192</td>
                                    </tr>
                                    <tr>
                                        <td>00997307</td>
                                        <td>South Melissa</td>
                                        <td>02 Jan 2019</td>
                                        <td><label class="badge badge-warning">Delayed</label></td>
                                        <td>20680</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-5 stretch-card">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex align-items-start justify-content-between">
                            <p class="card-title flex-grow">Purchases For The Year</p>
                            <div class="dropdown dropright card-menu-dropdown">
                                <button class="btn" type="button" id="cardMenuButton9" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="mdi mdi-dots-horizontal card-menu-btn"></i>
                                </button>
                                <div class="dropdown-menu" aria-labelledby="cardMenuButton9">
                                    <a class="dropdown-item" href="#">Action</a>
                                    <a class="dropdown-item" href="#">Another action</a>
                                    <a class="dropdown-item" href="#">Something else here</a>
                                </div>
                            </div>
                        </div>
                        <canvas id="purchases-chart-dark" height="200"></canvas>
                        <div class="d-flex justify-content-center mt-1 mt-xl-3">
                            <small class="font-weight-bold">Purchases</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- content-wrapper ends -->        
</div>
<!-- main-panel ends -->
</div>
<!-- page-body-wrapper ends -->
</div>
<!-- container-scroller -->
<?php require 'footer.php'; ?>
<script src="scripts/functions.js" type="text/javascript"></script>