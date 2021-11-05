<?php require 'header.php'; ?>
<?php require 'menu.php'; ?>

<!-- partial -->
<div class="main-panel">
    <div class="content-wrapper">
        <div class="row">
            <div class="col-md-12 grid-margin">
                <div class="d-flex justify-content-between flex-wrap">
                    <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center">
                        Bienvenido/a <?php echo $_SESSION['nombres']; ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- content-wrapper ends -->
</div>
<!-- main-panel ends -->

<?php require 'footer.php'; ?>