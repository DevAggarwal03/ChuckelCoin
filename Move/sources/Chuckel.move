module Chuckel::chuckel {
    struct Chuckel {}

    fun init_module(sender: &signer) {
        aptos_framework::managed_coin::initialize<Chuckel>(
            sender,
            b"Chuckel",
            b"CLK",
            6,
            false,
        );
    }
}