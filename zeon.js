- name: Run e2e tests
        shell: bash
        run: scripts/tests.e2e.sh ./build/avalanchego
      - name: Run e2e tests for whitelist vtx
        shell: bash
        run: ENABLE_WHITELIST_VTX_TESTS=true ./scripts/tests.e2e.sh ./build/avalancheg
        # e.g.,
# ./scripts/build.sh
# ./scripts/tests.e2e.sh ./build/avalanchego
# ENABLE_WHITELIST_VTX_TESTS=true ./scripts/tests.e2e.sh ./build/avalanchego
if ! [[ "$0" =~ scripts/tests.e2e.sh ]]; then
  echo "must be run from repository root"
  exit 255
@@ -16,6 +17,8 @@ if [[ -z "${AVALANCHEGO_PATH}" ]]; then
  exit 255
fi

ENABLE_WHITELIST_VTX_TESTS=${ENABLE_WHITELIST_VTX_TESTS:-false}

#################################
# download avalanche-network-runner
# https://github.com/ava-labs/avalanche-network-runner
@@ -74,11 +77,12 @@ PID=${!}
echo "running e2e tests against the local cluster with ${AVALANCHEGO_PATH}"
./tests/e2e/e2e.test \
--ginkgo.v \
--ginkgo.skip "\[Local\]" \
--log-level debug \
--network-runner-grpc-endpoint="0.0.0.0:12342" \
--avalanchego-log-level=INFO \
--avalanchego-path=${AVALANCHEGO_PATH} \
--enable-whitelist-vtx-tests=true || EXIT_CODE=$?
--enable-whitelist-vtx-tests=${ENABLE_WHITELIST_VTX_TESTS} || EXIT_CODE=$?

kill ${PID}
