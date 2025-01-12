script {
    fun register(account: &signer) {
        aptos_framework::managed_coin::register<Chuckel::chuckel::Chuckel>(account)
    }
}